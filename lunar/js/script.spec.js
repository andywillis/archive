'use strict';

//beforeEach(function () {
//    setFixtures('<div id="moon"></div><div id="lander"><div id="rover"></div></div>');
//});

const view = new informa.View();
const moon = new informa.Moon();
const rover = new informa.Rover();
const lander = new informa.Lander();
const missionControl = new informa.MissionControl({ lander, rover, moon, view });

describe("The Lander", function () {

    const landingCoords = { x: 3, y: 2 };

    missionControl.init(landingCoords);
    missionControl.landOnMoon();

    it("can land on the Moon", function () {
        expect(missionControl.lander.hasLanded).toEqual(true);
    });

    it("will land at a specific position", function () {
        expect(missionControl.lander.coords).toEqual(landingCoords);
    });
});

describe("The Rover", function () {

    missionControl.disembarkRover();

    it("can disembark the Lander", function () {
        expect(missionControl.rover.isStowed).toEqual(false);
    });

    it("will disembark initially at the Landers position", function () {
        expect(missionControl.rover.coords).toEqual(missionControl.lander.coords);
    });

    it("can move around the Moon", function () {
        missionControl.moveRover('up');
        missionControl.moveRover('left');
        expect(missionControl.rover.coords).toEqual({ x: 2, y: 1 });
    });
});
