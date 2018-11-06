define([
  'text!Templates/header.htm'
  ], function (header) {

  var template;

  return Backbone.View.extend({

    el: 'div#header',
    template: _.template(header),

    events: {
      'click .menu': 'updateMenu'
    },

    stik: function() {
      console.log('p');
    },

    initialize: function () {
      _.bindAll(this)
      core.merge(this, this.options.app)
    },

    render: function () {
      this.$el.html(this.template({ results: this.collections.menu.toJSON() }));
      return this;
    },

    updateMenu: function (event) {
      var item = $(event.target)
        , id = item.attr('id')
        , viewName = item.attr('name') || 'menu-button-home'
        ;

      this.collections.menu
        .chain()
        .filter(function (model) {return model.get('class') === 'menu active'})
        .each(function (model) {return model.set('class', 'menu inactive') })

      this.collections.menu.get(id).set('class', 'menu active')

      this.render()

      var getView = {
        'menu-button-home': '',
        'menu-button-logCall': 'log',
        'menu-button-openCalls': 'open',
        'menu-button-reports': 'reports',
        'menu-button-search': 'search'
      }

      if (viewName 
            && viewName !== this.viewName 
            && this.viewName !== '') {

        var page = '#' + getView[viewName]
        window.location = page
//        this.router.navigate(getView[viewName], {trigger: true})
      }

      this.viewName = viewName
      $('#content[role]').attr('role', getView[viewName])

    }

  });

});