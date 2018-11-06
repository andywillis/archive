define([
  'text!Templates/home.htm'
  ], function (homeView) {

  return Backbone.View.extend({

    el: 'div#content',
    template: _.template(homeView),

    initialize: function () {
      core.merge(this, this.options.app)
    },

    render: function () {
      this.$el.html(this.template({data: this.collections.home.toJSON()}))
      return this;
    }

  });

});