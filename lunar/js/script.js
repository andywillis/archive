!(function (window) {
  'use strict';

  class MissionControl {
  
    constructor(props) {
      this.moon = props.moon;
      this.lander = props.lander;
      this.rover = props.rover;
      this.view = props.view;
      this.coords = null;
    }

    init(coords) {
      this.coords = coords;
    }

    landOnMoon() {
      this.lander.land(this.coords);
      this.view.updatePosition(this.lander, this.coords);
    }

    convertPosToValue(direction) {
      const coords = this.rover.coords;
      switch (direction) {
        case 'up':
          return { ...coords, y: coords.y - 1 };
        case 'right':
          return { ...coords, x: coords.x + 1 };
        case 'down':
          return { ...coords, y: coords.y + 1 };
        case 'left':
          return { ...coords, x: coords.x - 1 };
      }
    }

    disembarkRover() {
      this.rover.disembark(this.coords);
    }

    moveRover(direction) {
      const newCoords = this.convertPosToValue(direction);
      if (this.moon.inBounds(newCoords)) {
        this.rover.updateCoords(newCoords);
        this.view.updatePosition(this.rover, newCoords);
      }
      
    }

    reset() {
      window.location.reload(true);
    }

  }

  window.informa = window.informa || {};
  window.informa.MissionControl = MissionControl;

})(window);