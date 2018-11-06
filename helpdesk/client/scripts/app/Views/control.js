define([
  'text!Templates/control.htm',
  ], function (controlView) {

  var template;

  /*
   * The control view currently operates like a router until
   * a router is built.
   */

  return Backbone.View.extend({

    el: 'div#main',
    template: _.template(controlView),
    viewName: '',

    initialize: function () {
      _.bindAll(this)
      var app = this.options.app

      // Merge the passed data with this context
      core.merge(this, app)

      // Check for changes on the menu
      this.collections.menu.bind('change', this.changeView)

      // Instantiate new views
      this.home = new this.views.home({ app: app });
      this.logCall = new this.views.logCall({ app: app});
      this.calls = new this.views.calls({ app: app });
      this.reports = new this.views.reports({ app: app });
      this.search = new this.views.search();

      // Render the home view
      this.home.render()
    },

    render: function () {
      this.$el.html(this.template)
      return this;
    },

    // View changes every time the menu collection changes
    changeView: function(event) {
      var viewName = event ? event.get('name') : 'menu-button-home'
        , data
        , viewArr
        , getView = {
            'menu-button-home': this.home,
            'menu-button-logCall': this.logCall,
            'menu-button-openCalls': this.calls,
            'menu-button-reports': this.reports,
            'menu-button-search': this.search,
          }

      if (viewName 
            && viewName !== this.viewName 
            && this.viewName !== '') {
        getView[viewName].render()
      }

      this.viewName = viewName
      return this;

    }

  });

});