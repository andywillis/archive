module.exports = function (grunt) {
  return {
    coverage: 'coverage/coverage.html',
    documentation: 'documentation/**/*',
    build: {
      src: ['build/**/*'],
      options: {
        force: true
      }
    },
    concat: 'build/concat.js'
  };
};
