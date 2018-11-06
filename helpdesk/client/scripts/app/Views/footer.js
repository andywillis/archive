define([
  'text!Templates/footer.htm'
  ], function (footer) {

  var template;

  return Backbone.View.extend({

    el: 'div#footer',

    initialize: function () {
      this.render()
    },

    render: function () {
      var template = _.template(footer);
      this.$el.html(template);
      return this;
    }

  });

});