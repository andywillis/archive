(function (window) {

  const utils = {
    
    qs(selector, context) {
      if (context) return context.querySelector(selector);
      return document.querySelector(selector);
    },

    qsa(selector, context) {
      if (context) return context.querySelectorAll(selector);
      return document.querySelectorAll(selector);
    }
  }

  window.utils = window.utils || {};
  window.utils = utils;

})(window);
