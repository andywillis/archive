module.exports = function (grunt) {
  return {
    JSON: {
      files: [{
        expand: true,
        src: ['src/core/**/*.json'],
        dest: 'build/Minified JSON',
        filter: 'isFile',
        flatten: true
      }]
    }
  };
};
