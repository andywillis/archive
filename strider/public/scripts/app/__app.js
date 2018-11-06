$(document).ready(function() {

  (function(){

    /*
     * Globals
     */

    var 
      $win = $(window)
      $content = $('#content')
      $header = $('header#header')
      $footer = $('footer#footer')

    function setMapHeight() { $content.height($win.height()-$header.outerHeight()-$footer.outerHeight()) }
    $win.bind('resize', setMapHeight)
    setMapHeight()

    /*
     * App
     */

    var config = {
      el: 'map',
      center: new L.LatLng(51.33088838086245, 1.2277658081054688),
      zoom: 14 
    }

    var center = 'http://nominatim.openstreetmap.org/search/33 Boystown Place, Eastry, Kent?format=json&polygon=1&addressdetails=1'

    var app = new Strider()

    app.init(config)

    $.ajax({
      type: 'GET',
      url: center,
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'jsonpcallback'
    })

    function jsonpcallback(data) {
      console.log(data);
    }

  }())

})