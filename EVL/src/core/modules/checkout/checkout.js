!function (global, moduleDefinition) {
  'use strict';

  var dependencies = [
    global.jQuery,
    global.Company.Utilities
  ];

  if (typeof exports === 'object') {
    module.exports = moduleDefinition();
  } else {
    global.Company.Utilities.addModule({
      namespace: 'Checkout.Moose.Trevor',
      module: moduleDefinition.apply(null, dependencies)
    });
  }

}(this, function ($, Util) {
  'use strict';

  /**
   * Utilities module
   * @type  {Object}
   */
  var Checkout = {

    name: 'checkout',
    namespace: 'venda',

    getName: function () {
      return this.name;
    },

    getNamespace: function () {
      return this.namespace;
    }

  };

  return Checkout;

});
