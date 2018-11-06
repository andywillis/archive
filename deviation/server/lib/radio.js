var inspect = require('util').inspect
  , http    = require('http')
  , us      = require('underscore')
  , qs      = require('querystring')
  , core    = require('./core')

var clientId = 'client_id=' + app.soundcloud.client_id
  , userId = app.soundcloud.user_id
  , options = {host: 'api.soundcloud.com', headers: {'User-Agent': 'node.js'}}
  , url = '/#{thing}/#{userId}/#{type}.json'
  , urlSearch = '/#{thing}.json'

var getContent = function(reqObj, res, thing, type, station, callback) {

  ;(type === 'search')
    ? urlString = urlSearch
    : urlString = url

  if (station === '') station = "house"

  var tags = app.blog.posts[0].tags.slice(0)
  var postId = app.blog.posts[0]._id
  st = station.split(' ')
  for (s in st) { tags.push(st[s]) }
  tags = tags.join(',')
  var options = {
      host: 'api.soundcloud.com'
    , headers: {'User-Agent': 'node.js'}
    , path: urlString.replace('#{thing}', thing).replace('#{userId}', userId).replace('#{type}', type)
    , query: qs.stringify({
        client_id: app.soundcloud.client_id
      , tags: tags
      , limit: 100
      })
  }

  options.path += '?' + options.query
//console.log(options);
//  console.log(options.path);

  var formatData = function(data, type) {

    switch(type) {
      case 'followings':
        var arr = []
        data = us.sortBy(data, function(el){ return el.username })
        arr.push('<ul class="main"><li>Followings</li><li>')
        for(var i = 0, l = data.length; i<l;  i++) {
          arr.push('<a href="' + data[i].permalink_url + '">')
          arr.push(data[i].username)
          arr.push('</a>')
          arr.push('&nbsp;&nbsp;&nbsp;')
        }
        arr.push('</li></ul>')
        return arr.join('')
      break;
      
      case 'search':
        var arr = [], size = 40, x = 10, y = 10, w = size, h = size

        data = us.sortBy(data, function(el){ return el.title })

        ;(data.length % 20 === 0)
          ? height = parseInt(data.length/20)
          : height = parseInt(data.length/20)+1

        arr.push('<div id="radioInfo"><input type="text" id="station" value="' + station + '" /></div>')
        arr.push('<div id="svgWrapper"><svg width="#{w}" height="#{h}" id="svg">'
          .replace('#{w}', size*20 + size/2)
          .replace('#{h}', size*height + size/2)
        )

        for(var i = 0, l = data.length; i<l;  i++) {
          var rgb = []
          for (var c = 0, cl = 3; c < cl; c++) {
            var randomnumber=Math.floor(Math.random()*256)
            rgb[c] = randomnumber
          }

//        console.log(data[i]);

        var trackInfoObj = {
            id: data[i].id + '' || ''
          , title: data[i].title || ''
          , duration: data[i].duration || ''
          , waveform_url: data[i].waveform_url || ''
          , permalink_url: data[i].permalink_url || ''
          , avatar_url: data[i].user.avatar_url || ''
        }

        var trackInfo = JSON.stringify(trackInfoObj)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')

        var square = '<rect class="radioSquare" id="#{id}" data-id="#{data-id}" data-trackInfo="#{trackInfo}" x="#{x}" y="#{y}" width="#{w}" stroke="rgba(30,30,40,1)" fill="rgb(#{fill})" height="#{h}"/>'
          .replace('#{id}', data[i].id)
          .replace('#{trackInfo}', trackInfo)
          .replace('#{data-id}', data[i].uri + '/stream?client_id=' + app.soundcloud.client_id)
          .replace('#{fill}', rgb.join(','))
          .replace('#{x}', x)
          .replace('#{y}', y)
          .replace('#{w}', w)
          .replace('#{h}', h)

        arr.push(square)
        x += w
        if (x-10 === w * 20) { y += h; x = 10 }
        
        }
        arr.push('</svg></div>')
        arr.push('<div id="trackInfoWrapper">')
        arr.push('<div id="trackInfo">')
        arr.push('</div>')
        arr.push('</div>')
        return arr.join('')
      break;

      case 'playlist':
        var arr = []
        data = us.sortBy(data, function(el){ return el.title })
        for(var i = 0, l = data.length; i<l;  i++) {
          var obj = {}
          obj.id = data[i].id
          obj.title = data[i].title
          obj.duration = data[i].duration
          obj.url = data[i].uri + '/stream?client_id=' + app.soundcloud.client_id
          arr.push(obj)
        }
        //console.log(arr);
        return arr
      break;

    }
  }
 
  http.get(options, function(data) {

    try {
      
      if (data.statusCode !== 200) throw data.statusCode
      else {

          var body = ''
            , results = []

          data.on('data', function (chunk) {
            body += chunk
          }).on('error', function (error) {
            console.log('ERROR: ' + error)
          }).on('end', function() {
            results[0] = JSON.parse(body)
            results[1] = formatData(results[0], type)
            results[2] = formatData(results[0], 'playlist')
            callback(results)
          })

        }

    } catch(err) {
      res.statusCode = (err === 503) ? 503 : 404
      app.control['error'](reqObj, res)
    }

  })

}

exports.getContent = getContent