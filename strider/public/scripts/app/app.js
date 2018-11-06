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
      center: [51.33088838086245, 1.2277658081054688],
      zoom: 14 
    }

    var app = new Strider()
    app.init(config)
//    app.changeView('Eastry, Kent, UK')

    $('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" })

    $('#newLocationInput').bind('keypress', function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        $("#lean_overlay").fadeOut(200);
        $('#newLocation').hide()
        app.changeView($(this).val(), 15)
      }
    })

  }())

})