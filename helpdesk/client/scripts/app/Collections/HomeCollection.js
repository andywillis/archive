define(['backbone', 'localstorage', 'Models/Home'], function (Backbone, LocalStorage, Home) {

  return Backbone.Collection.extend({

    model: Home,
    localStorage: new Store('home'),


    initialize: function () {
      this.on('add', function () {
        var pl = (this.length > 1) ? 's' : ''
        console.log(this.length + ' fault' + pl + ' in collection.');
      });
    }

  });

});