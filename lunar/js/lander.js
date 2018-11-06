!(function lander (window) {
  'use strict';
  
  class Lander {
    
    constructor() {
      this.el = utils.qs('#lander');
      this.coords = null;
      this.hasLanded = false;
    }

    land(coords) {
      this.coords = coords;
      this.hasLanded = true;
    }

    getPosition() {
      return this.position;
    }

  }

  window.informa = window.informa || {};
  window.informa.Lander = Lander;

})(window);