define(['backbone'], function (Backbone) {

  return Backbone.Model.extend({
    
    defaults: {
      id: '',
      date: '',
      text: ''
    }
    
  });

});