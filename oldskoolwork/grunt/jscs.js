module.exports = function (grunt) {
  return {
    src: ['src/core/**/*.js'],
    options: {
      config: '.jscsrc'
    }
  };
};
