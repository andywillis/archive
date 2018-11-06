module.exports = function (grunt) {
  return {
    files: grunt.tasks,
    options: {
      lazy: true,
      basePath: 'test/coverage/instrument/'
    }
  };
};
