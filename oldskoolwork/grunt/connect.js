module.exports = function (grunt) {
  return {
    options: {
      port: 3000,
      hostname: 'localhost'
    },
    livereload: {
      options: {
        middleware: function (connect) {
          return [
            grunt.livereload.lrSnippet,
            grunt.livereload.mountFolder(connect, 'src')
          ];
        }
      }
    }
  };
};
