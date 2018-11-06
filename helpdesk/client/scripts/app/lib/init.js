define([
  'lib/getModels',
  'lib/getCollections',
  'lib/getViews',
  'lib/getClientInfo',
  'lib/Logger',
  'lib/getRouter'
  ], function (getModels, getCollections, getViews, getClientInfo, Logger, getRouter) {

  return function init() {
    var app = {}
    app.clientInfo = getClientInfo()
    app.models = getModels();
    app.collections = getCollections();
    app.views = getViews();
    app.routers = getRouter();
    app.log = new Logger()
    return app
  }

});