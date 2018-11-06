!function (global, moduleDefinition) {
  'use strict';

  var dependencies = {
    $: global.jQuery
  };

  /**
   * module.exports for Mocha testing only
   */
  if (typeof exports === 'object') {
    module.exports = moduleDefinition();
  } else {
    global.Company = moduleDefinition(dependencies);
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

  var Company = {

    version: '0.0.1',
    copyright: 'Andy 2014 Company Ltd.',
    name: 'EVL',

    data: {
      vTags: {},
      templates: {}
    },
    templates: ['main', 'two'],
    folders: { templates: 'core/templates/' },

    getVersion: function () {
      return this.version;
    },

    getName: function () {
      return this.name;
    },

    getCopyright: function () {
      return this.copyright;
    }

  };

  return Company;

});
