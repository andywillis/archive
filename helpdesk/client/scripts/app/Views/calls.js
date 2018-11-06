define([
  'text!Templates/calls.htm',
  'text!Templates/call.htm'
  ], function (callsView, callView) {

  var template;

  return Backbone.View.extend({

    el: 'div#content',
    template0: _.template(callsView),
    template1: _.template(callView),

    events: {
      'click #calls thead th': 'sortCallsByColumn',
      'click #calls tbody tr': 'showCall',
      'click .returnToCalls': 'render'
    },

    initialize: function () {
      _.bindAll(this)
      core.merge(this, this.options.app)
    },

    render: function (callid) {
      var data, template
      if (callid && typeof callid !== 'object') {
        data = this.collections.calls.where({callid: parseInt(callid)})[0].toJSON()
        template = this.template1
      } else {
        data = this.collections.calls.toJSON()
        template = this.template0
      }
      this.$el.html(template({ data: data }))
      return this;
    },

    sortCallsByColumn: function(event) {
      var column = event.currentTarget.classList[0]
      this.collections.calls.sortByColumn(column)
      this.render()
    },

    showCall: function(event) {
      var callid = event.currentTarget.cells[0].innerHTML;
      console.log(callid);
      this.render(callid)
    }

  });

});