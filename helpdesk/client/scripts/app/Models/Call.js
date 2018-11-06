define(['backbone'], function (Backbone) {

  return Backbone.Model.extend({
      
    defaults: {
      callid: '',
      date: '',
      service: '',
      client: '',
      priority: 0,
      summary: '',
      description: ''
    }
    
  });

});