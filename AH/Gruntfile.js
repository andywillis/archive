'use strict';

module.exports = function (grunt) {

  grunt.pkg = grunt.file.readJSON('package.json');
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt);
};
