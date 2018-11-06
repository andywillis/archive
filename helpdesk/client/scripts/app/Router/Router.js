define(['backbone'], function (Backbone) {

  return Backbone.Router.extend({

    initialize: function (options) {
      var app = options.app
      core.merge(this, options.app)
      this.header = new this.views.header({ app: app });
      this.home = new this.views.home({ app: app });
      this.log = new this.views.logCall({ app: app});
      this.open = new this.views.calls({ app: app });
      this.reports = new this.views.reports({ app: app });
      this.search = new this.views.search();
      this.header.render()
      Backbone.history.start()
    },

    routes: {
      "": "home",
      "home": "home",
      "log": "log",
      "open": "open",
      "reports": "reports",
      "search": "search"
    },

    home: function () {
      this.home.render()
    },

    log: function () {
      this.log.render()
    },

    open: function () {
      this.open.render()
    },

    reports: function () {
      this.reports.render()
    },

    search: function () {
      this.search.render()
    },

  });

});