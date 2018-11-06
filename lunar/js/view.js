!(function view (window) {
  'use strict';
  
  class View {
    
    updatePosition(obj, coords) {
      obj.el.style.left = `${this.getMapPos(coords.x)}px`;
      obj.el.style.top = `${this.getMapPos(coords.y)}px`;
    }

    getMapPos(pos) {
      return this.border + (this.dimension * pos);
    }

  }

  window.informa = window.informa || {};
  window.informa.View = View;

})(window);