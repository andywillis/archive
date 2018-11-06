module.exports = function (grunt) {
  return {
    target: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: 'some',
        sourceMap: true,
        sourceMapName: 'build/<%= grunt.pkg.name %>-<%= grunt.pkg.version %>.map'
      },
      files: {
        'build/<%= grunt.pkg.name %>-<%= grunt.pkg.version %>.min.js': ['build/concat.js']
      }
    }
  };
};
