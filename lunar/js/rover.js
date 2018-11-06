!(function rover (window) {
  
    class Rover {
      
      constructor() {
        this.el = utils.qs('#rover');
        this.isStowed = true;
        this.coords = null;
      }

      disembark(coords) {
        this.coords = coords;
        this.isStowed = false;
        this.el.style.backgroundColor = '#33ff33';
      }

      updateCoords(coords) {
        this.coords = coords;
      }

    }
  
    window.informa = window.informa || {};
    window.informa.Rover = Rover;
  
  })(window);