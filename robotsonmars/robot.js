;(function () {

  function Robot(params) {
    this.name = params.name;
    return this;
  }

  /**
   * Takes arguments from Mission 1) sets up a local map for the
   * robot to follow, 2) the current position of the robot on the map.
   */
  Robot.prototype.initialiseRobot = function (params) {
    var position = params.position.split(' ');
    this.map = params.map;
    this.mapDimensions = params.mapDimensions;
    this.x = +position[0] || 0;
    this.y = +position[1] || 0;
    this.oldX = this.x;
    this.oldY = this.y;
    this.orientation = position[2] || 'N';
    this.setPosition(this.getPosition(this.x, this.y));
    this.instructions = params.instructions || null;
    return this;
  };

  /**
   * Checks whether the robot has left the map array via either end of the
   * map array, or via one of the map sides
   */
  Robot.prototype.isPositionOnMap = function (position) {
    if (position > (this.mapDimensions.x - 1) * (this.mapDimensions.y - 1)) { return false; }
    if (position < 0) { return false; }
    if (this.x < 0 || this.x > this.mapDimensions.x - 1) { return false; }
    if (this.y < 0 || this.y > this.mapDimensions.y - 1) { return false; }
    return true;
  };

  Robot.prototype.setPosition = function (position) {
    this.position = position;
    return this;
  };

  /**
   * Calculates the robot position within the map array
   */
  Robot.prototype.getPosition = function (x, y) {
    return y * (this.mapDimensions.x) + x;
  };

  /**
   * Checks the robot orientation against NESW and rotates it against
   * the new rotation instruction
   */
  Robot.prototype.rotate = function (rotation) {
    var directions = ['N', 'E', 'S', 'W'];
    var currentOrientation = directions.indexOf(this.orientation);
    if (rotation === 'R') {
      if (currentOrientation === directions.length - 1) {
        this.orientation = directions[0];
      } else {
        this.orientation = directions[currentOrientation + 1];
      }
    }
    if (rotation === 'L') {
      if (currentOrientation === 0) {
        this.orientation = directions[directions.length - 1];
      } else {
        this.orientation = directions[currentOrientation - 1];
      }
    }
    return this;
  };

  /**
   * Simple method to work out whether to move forward or rotate
   */
  Robot.prototype.processInstruction = function (instruction) {
    return ['R', 'L'].indexOf(instruction) > -1 ? 'rotate' : 'forward';
  };

  /**
   * Adjusts the robot position given the current orientation
   */
  Robot.prototype.moveForward = function (orientation) {
    switch (orientation) {
      case 'N': this.y++; this.setPosition(this.position + this.mapDimensions.x); break;
      case 'E': this.x++; this.setPosition(this.position + 1); break;
      case 'S': this.y--; this.setPosition(this.position - this.mapDimensions.x); break;
      case 'W': this.x--; this.setPosition(this.position - 1); break;
    }
    return this;
  };

  /**
   * Checks the next valid instruction
   */
  Robot.prototype.nextInstructionValid = function (position, direction) {
    if (typeof this.map[position] === 'object' && this.map[position].smell === direction) {
      return false;
    }
    return true;
  };

  /**
   * Performs the instructions given to the robot, either rotate or move forward,
   * and returns an object containing the last position and whether it has failed
   * or completed its mission
   */
  Robot.prototype.runMission = function (params) {
    this.map = params.map;
    for (var i = 0, l = this.instructions.length; i < l; i++) {
      var instruction = this.processInstruction(this.instructions[i]);
      if (instruction === 'rotate') {
        this.rotate(this.instructions[i]);
      }
      if (instruction === 'forward') {
        if (this.nextInstructionValid(this.getPosition(this.x, this.y), this.orientation)) {
          this.moveForward(this.orientation);
        } else {
          continue;
        }
      }
      if (!this.isPositionOnMap()) {
        this.status = 'LOST';
      }
    }
    return { x: this.x, y: this.y, pos: this.orientation, status: this.status || '' };
  };

  window.Robot = Robot;

}());
