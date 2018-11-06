$(document).ready(function() {
  (function(window) {

    function Strider () {

      this.defaults = { el: 'map', center: [51.33088838086245, 1.2277658081054688], zoom: 14 }
      this.map = new L.Map('map')
      this.baseLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      this.map.addLayer(this.baseLayer)

      this.init = function(config) {
        if (core.isEmpty(config)) {
          console.log('Config file not found. Reverting to defaults.');
        } else {
          for (var prop in config) {
            if (config.hasOwnProperty(prop)) {
              this[prop] = config[prop]
            }
          }      
        }
        this.map.setView(new L.LatLng(config.center[0], config.center[1]), config.zoom)
      }

      this.changeView = function(address, zoom) {
        var self = this;
        var open = 'http://nominatim.openstreetmap.org/search/' +  address +  '?format=json&polygon=1&addressdetails=1'

        this.getJSON(open, function(err, data) {
          if (err) console.log(err);
          if (data) {
            self.map.setView(new L.LatLng(data.lat, data.lon), zoom)
          }
        })

      }

      this.getJSON = function(url, callback) {
        $.ajax({
          type: 'GET',
          url: url,
          success: function(data) {
            if (data) {
               callback(null, JSON.parse(data)[0])
            } else {
              callback('No data.');
            }
          },
          error: function(err) {
            callback(err);
          }
        })
      }

      return this;

    }

    if (!window.Strider) window.Strider = Strider;

  }(window))
})