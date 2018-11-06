define(['backbone', 'Models/sidebarItem'], function (Backbone, sidebarItem) {

  return Backbone.Collection.extend({

    model: sidebarItem

  });

});