;(function () {

  function Mission() {
    this.name = 'Mission to Mars!';
  }

  /**
   * Process the mission input, merge in the robots, and check that map
   * size doesn't exceed 50 on either vertex
   */
  Mission.prototype.start = function (missionInput, robots) {
    this.missionInput = this.processMissionInput(missionInput);
    this.robots = robots;
    this.mapDimensions = this.getMapDimensions(this.missionInput);
    if (this.checkMissionInput(this.mapDimensions)) {
      this.proceedWithMission();
    } else {
      console.log('Grid too large for little robots.');
    }
  };

  /**
   * If all is well, build the map array, process the robot instructions
   * and let them loose
   */
  Mission.prototype.proceedWithMission = function () {
    this.buildMap(this.mapDimensions);
    this.processRobotInstructions(this.missionInput);
    this.controlRobots();
  };

  /**
   * Create the map array
   */
  Mission.prototype.buildMap = function (dimensions) {

    // need to add 1 to each coordinate (5 x 3 should give a 24 square grid)
    this.x = +dimensions.x + 1;
    this.y = +dimensions.y + 1;
    this.map = new Array(this.x * this.y);
    return this;
  };

  /**
   * This method assumes that, in the future, the mission input might
   * come from an operator typing the instructions into a text box. This
   * has been replicated in missionInput in mission.js, but time was short so
   * wasn't implemented here. In short, split the text against the carriage
   * returns based on the example, then filter out the "" elements.
   */
  Mission.prototype.processMissionInput = function (input) {
    return input.split(/\n/g).filter(function (e) {
      return e === 0 || e;
    });
  };

  /**
   * Get the first element in the missionInput and create an object of xy values
   */
  Mission.prototype.getMapDimensions = function (input) {
    input = input[0].split(' ');
    return { x: +input[0], y: +input[1] };
  };

  /**
   * Checks to see if the given map coords exceed the mission requirements
   */
  Mission.prototype.checkMissionInput = function (map) {
    if (map.x < 50 || map.y < 50) { return true; }
    return false;
  };

  /**
   * For each robot, allow it to process its instruction from the mission input
   */
  Mission.prototype.processRobotInstructions = function (instructions) {
    var robotInstructionPos = 1;
    for (var i = 0, l = this.robots.length; i < l; i++) {
      this.robots[i].initialiseRobot({
        mapDimensions: { x: this.x, y: this.y },
        position: instructions[robotInstructionPos],
        instructions: instructions[robotInstructionPos + 1]
      });
      robotInstructionPos += 2;
    }
    return this;
  };

  /**
   * Run the robot missions. It checks to see if the robot has succeeded its
   * mission - if no, it logs the map smell, otherwise it logs the last position.
   * It passes in the updated mission map to the new robot so it can identify the
   * possible smells.
   */
  Mission.prototype.controlRobots = function () {
    for (var i = 0, l = this.robots.length; i < l; i++) {
      var missionStatus = this.robots[i].runMission({ map: this.map });
      this.logLastPosition(i, missionStatus);
      if (missionStatus.status === 'LOST') {
        this.addSmell(missionStatus);
      }
    }
  };

  /**
   * Logs the robot stats to the screen
   */
  Mission.prototype.logLastPosition = function (robot, status) {
    var html = [
      this.robots[robot].name, ': ',
      status.x, ' ',
      status.y, ' ',
      status.pos, ' ',
      status.status, '<br/>'
    ].join('');
    var body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', html);
  };

  /**
   * Adds a grid position's smell if there is one
   */
  Mission.prototype.addSmell = function (status) {
    this.map[status.y * (this.mapDimensions.x + 1) + status.x] = { smell: status.pos };
  };

  window.Mission = Mission;

}());
