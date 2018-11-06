define(['backbone', 'localstorage', 'Models/Call'], function (Backbone, LocalStorage, Call) {

  return Backbone.Collection.extend({

    model: Call,
    sortKey: 'callid',
    localStorage: new Store('calls'),

    initialize: function () {
      this.on('fetch', function () {
        this.currentId = this.length
      });
      this.on('add', function () {
        var pl = (this.length > 1) ? 's' : ''
        console.log(this.length + ' fault' + pl + ' in collection.');
      });
    },

    comparator: function(item) {
      return this.sortKey === 'callid'
        ? -item.get(this.sortKey)
        : item.get(this.sortKey)
    },

    sortByColumn: function(colName) {
      this.sortKey = colName;
      this.sort();
    },

    nextCallId: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.length + 1;
    }

  });

});