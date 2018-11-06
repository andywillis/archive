module.exports = function (grunt) {
  return {
    scripts: {
      files: [
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.json'
      ],
      options: {
        spawn: false,
        livereload: grunt.livereload.port
      }
    }
  };
};
