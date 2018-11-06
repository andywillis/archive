'use strict';

module.exports = function (grunt) {
  return {
    options: {
      shorthandCompacting: false,
      roundingPrecision: -1
    },
    combine: {
      files: {
        'public/css/bundle.css': ['src/css/*.css']
      }
    }
  }
};
