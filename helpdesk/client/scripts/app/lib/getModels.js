define([
  'Models/Call',
  'Models/Report',
  'Models/MenuItem'
], function (Call, Report, MenuItem) {

  return function getModels() {
      var models = {};
      models.Call = Call;
      models.MenuItem = MenuItem;
      models.Report = Report;
      return models;
    }

});