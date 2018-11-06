define([
  'lib/init',
  'Router/Router'
  ], function (init, Router) {

//  Backbone.history.start()

  function App () {

    var app = init();
    app.router = new app.routers({ app:app })
//    new app.views.header({ app: app });
//    new app.views.control({ app: app });
    return app;
  };

  return App;

});