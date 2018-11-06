/* global Company: true */

!function (global, moduleDefinition) {
  'use strict';

  var dependencies = {
    Company: global.Company,
    $: global.jQuery
  };

  if (typeof exports === 'object') {
    module.exports = moduleDefinition();
  } else {
    global.Company.Utilities = moduleDefinition(dependencies);
  }

}(this, function (dependencies) {
  'use strict';

  /**
   * A requirement to allow this module to use client-side dependancies like
   * jQuery, *as well as* ignoring them when it is tested with Mocha. Originally
   * when $ was passed in to the module as a single parameter it
   * overrode the $ set up by JSDOM and destroyed the tests.
   * Now all parameters are passed in as an object and parsed into the local scope.
   */
  (function loadDependencies() {
    if (dependencies) { for (var k in dependencies) { k = dependencies[k]; } }
  }());

  /**
   * Utilities module
   * @type  {Object}
   */
  var Utilities = {

    loadDependencies: function () {
      this.getVtags();
      this.getTemplates();
      return this;
    },

    getVtags: function () {
      var $tags = $('div.js-vtag');
      $tags.each(function () {
        var $this = $(this);
        Company.data[$this.data('type')] = $this.html();
      });
      console.info('Loaded vTags');
      return this;
    },

    processTemplate: function (page, name) {
      return Company.data.templates[page][name].join('');
    },

    getJSON: function (name) {
      var folder = Company.folders.templates;
      return $.getJSON(folder + name + '.json', function (data) {
        Company.data.templates[name] = data;
      });
    },

    getTemplateList: function () {
      var arr = [];
      for (var i = 0, l = Company.templates.length; i < l; i++) {
        arr.push(this.getJSON(Company.templates[i]));
      }
      return arr;
    },

    getTemplates: function () {
      $.when.apply(null, this.getTemplateList()).then(function () {
        console.info('Templates loaded.');
      });
      return this;
    },

    /**
     * [addAModule description]
     * @method
     * @memberof
     * @extends
     * @requires
     * @module
     * @namespace
     * @param      {[type]}  params  [description]
     */
    addModule: function (params) {
      var split, obj = Company, current = obj, i, l;
      split = params.namespace.split('.');
      for (i = 0, l = split.length; i < l; i++) {
        current[split[i]] = {};
        current = current[split[i]];
      }
      var nsObj = this.getNamespaceObject(params.namespace);
      nsObj.parent[nsObj.path] = params.module;
      /*Object.defineProperty(nsObj.parent, nsObj.path, {
        value: params.module
      });*/
    },

    /**
     * @memberOf  Utilities
     * @method
     * @description Returns an object reference for the namespace parent
     *              object, and the name of the current namespace.
     * @param {String} namespace The required namespace as dot notation.
     * @return {Object} Namespace object
     */
    getNamespaceObject: function (namespace) {
      function index(el, i) { return el[i]; }
      return {
        parent: namespace.split('.').slice(0, -1).reduce(index, Company),
        path: namespace.split('.').pop()
      };
    },

    /**
     * @memberOf  Utilities
     * @method
     * @description Returns the detailed type of an object
     * @param {Object} x A JS object, string, number, function, null &tc.
     * @return {String} A description of the type
     */
    toType: function (x) {
      return ({}).toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },

    /**
     * @memberOf  Utilities
     * @description Returns the detailed type of an object
     * @method
     * @return {Object} Returns the whole module
     */
    revealAPI: function () {
      return {
        addToNamespace: this.addToNamespace.bind(this),
        loadDependencies: this.loadDependencies.bind(this),
        getVersion: this.getVersion.bind(this),
        getCopyright: this.getCopyright.bind(this),
        getCompany: this.getCompany.bind(this),
        revealTestAPI: this.revealTestAPI.bind(this)
      };
    },

    /**
     * @memberOf  Utilities
     * @description Returns the revealed API (subset) of the object only
     * @method
     * @return {Object} Returns the module API
     */
    revealTestAPI: function () {
      return this;
    }

  };

  return Utilities;

});
