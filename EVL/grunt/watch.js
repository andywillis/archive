module.exports = function (grunt) {
  return {
    scripts: {
      files: [
        'src/core/**/*.js',
        'src/lib/**/*.css',
        'src/core/**/*.json'
      ],
      options: {
        spawn: false,
        livereload: grunt.livereload.port
      }
    }
  };
};
