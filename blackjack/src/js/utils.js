(function (window) {

  const utils = {
    
    qs(selector) {
      return document.querySelector(selector);
    },

    qsa(selector) {
      return document.querySelectorAll(selector);
    }
  }

  window.utils = window.utils || {};
  window.utils = utils;

})(window);
