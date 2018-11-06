define([
  'text!Templates/logCall.htm'
  ], function (logCallView) {

  var template;

  return Backbone.View.extend({

    el: 'div#content',
    template: _.template(logCallView),
    events: {
      'click #submitCall': 'saveCall'
    },

    initialize: function () {
      _.bindAll(this)
      core.merge(this, this.options.app)
    },

    render: function () {
      this.$el.html(this.template)
      return this;
    },

    saveCall: function () {
      var form = {}
      $('#logCallForm .item').each(function(){
        form[this.id] = (this.id === 'priority') 
          ? parseInt(this.value)
          : this.value
      })
      form.callid = this.collections.calls.nextCallId();
      form.date = dateFormat(new Date(), "dd mmm yyyy h:MM TT");
      form.client = 'Andy Willis'
      this.collections.calls.create(form)
    }


  });

});