# Notes

## Stucture

Two constructors: `Robot`, `Mission`.

Just load `robot.html` into a browser and the output will be produced.

## Principle

There is a main mission map. Once a robot has failed/completed its mission, it feeds back to mission control with its final coordinates, orientation, and whether it's failed or not. The mission map gets updated with this information and a copy of that map is given to the next robot so it knows whether to avoid a grid square or not.

## Procedure

Pseudocode the instructions into JavaScript-esque to ensure that all elements were represented, and develop from there. Used dependency injection so that future testing/mocking would be easier.

## I'm aware of the following

* No specific namespace - Robot and Mission are both global, but I figured I'd run into scoping issues if I tried to introduce one in the time available.

## Time taken

1:45h for main code, 20 mins for a quick refactor, 15 mins to add documentation.

## Coda

Added the JShint/JSCS config files for completeness.