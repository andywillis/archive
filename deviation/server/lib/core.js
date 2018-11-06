var us = require('underscore')
 ,  core = require('./core')

var processListSpotmap = function(list, fn, object, additionalParameters, callback) {
  var elemNum = 0
  var arrLen = list.length
  var ArrayIterator = function() {
    fn(list[elemNum], elemNum, object, additionalParameters, function(object, iteration, additionalParameters){
      if (iteration === arrLen-1) callback(object)
      elemNum++
      if (elemNum < arrLen) process.nextTick(ArrayIterator)
    })
  }
  if (elemNum < arrLen) process.nextTick(ArrayIterator)
}

var processList = function(list, fn, object, callback){
	var elemNum = 0
	var arrLen = list.length
	var ArrayIterator = function(){
		fn(list[elemNum], elemNum, object, function(object, iteration){
			if (iteration === arrLen-1) callback(object)
      elemNum++
      if (elemNum < arrLen) process.nextTick(ArrayIterator)
		})
	}
	if (elemNum < arrLen) process.nextTick(ArrayIterator)
}

function encode(string) {
   return encodeURIComponent(string)
}

var decode = function(string) {
   return decodeURIComponent(string.replace(/\+/g,  " "));
}

var getFileDate = function() {
	
	var d = new Date()
		,	newDateOne = []
		,	newDateTwo = []
		,	newDate

	newDateOne[0] = d.getDate() + ''
	newDateOne[1] = d.getMonth()+1 + ''
	newDateOne[2] = d.getFullYear() + ''
	newDateTwo[0] = d.getHours() + ''
	newDateTwo[1] = d.getMinutes() + ''
	newDateTwo[2] = d.getSeconds() + ''
	newDateTwo[3] = d.getMilliseconds() + ''
	
	for (var i = 0, l = 3; i<l; i++){	if (newDateOne[i].length === 1) newDateOne[i] = '0' + newDateOne[i]	}
	for (var i = 0, l = 4; i<l; i++){ if (newDateTwo[i].length === 1) newDateTwo[i] = '0' + newDateTwo[i]	}
	
	return newDate = newDateOne.join('') + '.' + newDateTwo.join('')

}

/* JSONPath 0.8.3 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
function jsonPath(obj, expr, arg) {
   var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         var subx = [];
         return expr.replace(/[\['](\??\(.*?\))[\]']|\['(.*?)'\]/g, function($0,$1,$2){return "[#"+(subx.push($1||$2)-1)+"]";})  /* http://code.google.com/p/jsonpath/issues/detail?id=4 */
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
      },
      asPath: function(path) {
         var x = path.split(";"), p = "$";
         for (var i=1,n=x.length; i<n; i++)
            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
         return p;
      },
      store: function(p, v) {
         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
         return !!p;
      },
      trace: function(expr, val, path) {
         if (expr !== "") {
            var x = expr.split(";"), loc = x.shift();
            x = x.join(";");
            if (val && val.hasOwnProperty(loc))
               P.trace(x, val[loc], path + ";" + loc);
            else if (loc === "*")
               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
            else if (loc === "..") {
               P.trace(x, val, path);
               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               P.slice(loc, x, val, path);
            else if (/,/.test(loc)) { // [name1,name2,...]
               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  P.trace(s[i]+";"+x, val, path);
            }
         }
         else
            P.store(path, val);
      },
      walk: function(loc, expr, val, path, f) {
         if (val instanceof Array) {
            for (var i=0,n=val.length; i<n; i++)
               if (i in val)
                  f(i,loc,expr,val,path);
         }
         else if (typeof val === "object") {
            for (var m in val)
               if (val.hasOwnProperty(m))
                  f(m,loc,expr,val,path);
         }
      },
      slice: function(loc, expr, val, path) {
         if (val instanceof Array) {
            var len=val.length, start=0, end=len, step=1;
            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            for (var i=start; i<end; i+=step)
               P.trace(i+";"+expr, val, path);
         }
      },
      eval: function(x, _v, _vname) {
         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
      }
   };

   var $ = obj;
   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
      return P.result.length ? P.result : false;
   }
}

var randomString = function (len) {
  var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
  var string_length = len;
  var result = '';
  for (var i=0, l = string_length; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      result += chars.substring(rnum,rnum+1);
  }
  if (us.indexOf(app.blog.ids, result) === -1) return result
  else randomString(len)
}

var loadPostsToMemory = function() {
  var postTags = [], postCategories = [], spotmapTags = [], spotmapCategories = []
  app.blog = {}, app.blog.posts = [], app.blog.ids = [], app.blog.categories = [], app.blog.tags = []
  app.spotmapDB = {}, app.spotmapDB.spotmaps = [], app.spotmapDB.ids = [], app.spotmapDB.categories = [], app.spotmapDB.directors = [], app.spotmapDB.tags = []

  var data = app.db

   for (var i=0,l=data.length;i<l;i++) {
      switch(data[i].type) {
        case 'Post':
          app.blog.posts.push(data[i])
          app.blog.ids.push(data[i].key)
          postTags.push(data[i].tags)
          if (us.indexOf(app.blog.categories,data[i].category) === -1) app.blog.categories.push(data[i].category)
          app.blog.tags = us.uniq(us.flatten(postTags)).sort()
        break;
        case 'Spotmap':
          app.spotmapDB.spotmaps.push(data[i])
          app.spotmapDB.ids.push(data[i].key)
          spotmapTags.push(data[i].tags)
          if (us.indexOf(app.spotmapDB.categories, data[i].category) === -1) app.spotmapDB.categories.push(data[i].category)
          app.spotmapDB.tags = us.uniq(us.flatten(spotmapTags)).sort()
        break;
      }
   }

   console.log('Loaded blog to memory.'.ok)
   
}

exports.processList = processList
exports.processListSpotmap = processListSpotmap
exports.getFileDate = getFileDate
exports.jsonPath = jsonPath
exports.encode = encode
exports.decode = decode
exports.randomString = randomString
exports.loadPostsToMemory = loadPostsToMemory