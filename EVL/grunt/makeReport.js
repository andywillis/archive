module.exports = function (grunt) {
  return {
    src: 'test/coverage/reports/**/*.json',
    options: {
      type: ['lcov'],
      dir: 'test/coverage/reports',
      print: 'detail'
    }
  };
};
