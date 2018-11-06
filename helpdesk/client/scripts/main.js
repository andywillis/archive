require.config({

  baseUrl: '/client/scripts/app',

  paths: {
    jquery: '/client/scripts/lib/jquery',
    backbone: '/client/scripts/lib/backbone',
    localstorage: '/client/scripts/lib/backbone.localStorage-min',
    underscore: '/client/scripts/lib/underscore',
    modernizr: '/client/scripts/lib/modernizr',
    text: '/client/scripts/lib/text',
    dateFormat: '/client/scripts/lib/dateFormat',
    core: '/client/scripts/lib/core'
  },

  shim: {
    'underscore': {exports: '_'},
    'jquery': {exports: '$'},
    'backbone': {deps: ['underscore', 'jquery'], exports: 'Backbone'},
    'localstorage': {deps: ['backbone'], exports: 'LocalStorage'},
    'leaflet': {exports: 'L'},
    'dateFormat': {exports: 'dateFormat'},
    'core': {exports: 'core'}
  }

});

require(['app'], function (App) {
  var app = App();
});