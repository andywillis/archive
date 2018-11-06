module.exports = function (grunt) {
  return {
    prod: {
      src: ['src/core/**/*.js'],
      dest: 'build/concat.js'
    }
  };
};
