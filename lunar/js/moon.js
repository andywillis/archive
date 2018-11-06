!(function moon (window) {
  'use strict';
  
  class Moon {

    constructor() {
      this.el = utils.qs('#moon');
      this.x = 6;
      this.y = 6;
      this.border = 8;
      this.dimension = 50;
    }

    inBounds(coords) {
      if (coords.y - 1 < -1) return false;
      if (coords.x + 1 > this.x) return false;
      if (coords.y + 1 > this.y) return false;
      if (coords.x - 1 < -1) return false;
      return true;
    }
  
  }

  window.informa = window.informa || {};
  window.informa.Moon = Moon;

})(window);