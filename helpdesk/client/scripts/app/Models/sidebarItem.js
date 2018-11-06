define(['backbone'], function (Backbone) {

  return Backbone.Model.extend({
    
    defaults: {
      name: '',
      label: '',
      id: '',
      class: ''
    }
    
  });

});