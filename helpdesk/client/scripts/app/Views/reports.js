define([
  'text!Templates/reports.htm'
  ], function (reportsView) {

  var template;

  return Backbone.View.extend({

    el: 'div#content',
    template: _.template(reportsView),

    events: {
      'click #reports th': 'sortReportsByColumn'
    },

    initialize: function () {
      _.bindAll(this)
      core.merge(this, this.options.app)
    },

    render: function () {
      this.$el.html(this.template({ data: this.collections.reports.toJSON() }))
      return this;
    },

    sortReportsByColumn: function(event) {
      var column = event.currentTarget.classList[0];
      this.data.sortByColumn(column)
      this.render()
    }

  });

});