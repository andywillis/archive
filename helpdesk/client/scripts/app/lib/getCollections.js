define([
  'Collections/CallsCollection',
  'Collections/ReportsCollection',
  'Collections/MenuItemsCollection',
  'Collections/SidebarItemsCollection',
  'Collections/HomeCollection',
  'data/data'
], function (CallsCollection, ReportsCollection, MenuItemsCollection, SidebarItemsCollection, HomeCollection, data) {

  return function getCollections() {
    var collections = {};
    collections.menu = new MenuItemsCollection(data.menu);
    collections.home = new HomeCollection(data.home);
    collections.calls = new CallsCollection();
    collections.calls.fetch()
//    collections.calls.invoke('save')
    collections.reports = new ReportsCollection(data.testReports);
//    collections.reports.invoke('save')
    collections.sidebar = new SidebarItemsCollection(data.sidebar);
    return collections;
  }

});