define([
  'core',
  'Views/control',
  'Views/header',
  'Views/footer',
  'Views/home',
  'Views/logCall',
  'Views/calls',
  'Views/reports',
  'Views/search',
], function (core, control, header, footer, home, logCall, calls, reports, search) {

    var viewsList = core.getParamNames(arguments.callee)

    return function getViews() {
      var views = {}
      viewsList.forEach(function (view) {
        views[view] = eval(view)
      })
      return views;
    }

});