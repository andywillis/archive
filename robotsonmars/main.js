;(function (Robot, Mission) {

  // Prefer arrays + join as my preferred JSHint setup warns
  // about lengthy strings. Here I've replicated a mission operator typing
  // in a mission input into a text box according to the example input.
  var missionInput = [
    '5 3\n',
    '1 1 E\n',
    'RFRFRFRF\n\n',
    '3 2 N\n',
    'FRRFLLFFRRFLL\n\n',
    '0 3 W\n',
    'LLFFFLFLFL'
  ].join('');

  // I was reminded of the sequence in Short Circuit when Johnny 5 reprograms
  // the other robots to behave like the Three Stooges :)
  var robots = [
    new Robot({ name: 'Larry' }),
    new Robot({ name: 'Curly' }),
    new Robot({ name: 'Moe' })
  ];

  var mission = new Mission();

  // Dependency injection for the win
  mission.start(missionInput, robots);

}(window.Robot, window.Mission));
