define(['backbone', 'Models/menuItem'], function (Backbone, menuItem) {

  return Backbone.Collection.extend({

    model: menuItem

  });

});