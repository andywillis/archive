define(function () {
  'use strict';

  /**
   * Factory for creating new companies
   * @return {Function} A factory function that returns a new empty company object
   */
  return function (params) {
    return {
      id: params.id,
      name: params.name,
      office: params.office,
      products: [],
      type: params.type
    };
  };

});
