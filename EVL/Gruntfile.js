module.exports = function (grunt) {

  try {
    grunt.sftp = grunt.file.readJSON('.sftprc');
  } catch (e) {
    console.log(e);
  }

  grunt.pkg = grunt.file.readJSON('package.json');

  // Set up livereload
  grunt.livereload = {};
  grunt.livereload.port = 35729;
  grunt.livereload.lrSnippet = require('connect-livereload')({ port: grunt.livereload.port });
  grunt.livereload.mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  var dateFormat = require('dateformat');
  grunt.reportDir = 'build/reports/' + dateFormat(new Date(), 'yyyymmdd-HHMMss');
  grunt.tests = 'test/**/*.js';
  grunt.tasks = 'tasks/**/*.js';

  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    loadGruntTasks: {
      pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    }
  });

};
