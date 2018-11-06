define(['backbone', 'localstorage', 'Models/Report'], function (Backbone, LocalStorage, Report) {

  return Backbone.Collection.extend({

    model: Report,
    sortKey: 'reportid',
    localStorage: new Store('reports'),


    initialize: function () {
      this.on('add', function () {
        var pl = (this.length > 1) ? 's' : ''
        console.log(this.length + ' report' + pl + ' in collection.');
      });
    },

    comparator: function(item) {
      return this.sortKey === 'reportid'
        ? -item.get(this.sortKey)
        : item.get(this.sortKey)
    },

    sortByColumn: function(colName) {
      this.sortKey = colName;
      this.sort();
    }

  });

});