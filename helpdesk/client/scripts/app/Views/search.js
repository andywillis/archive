define([
  'text!Templates/search.htm'
  ], function (searchView) {

  var template;

  return Backbone.View.extend({

    el: 'div#content',
    template: _.template(searchView),

    initialize: function () {
      _.bindAll(this)
      this.collection = this.options.collection
    },

    render: function (callid) {
      this.$el.html(this.template())
      return this;
    }

  });

});