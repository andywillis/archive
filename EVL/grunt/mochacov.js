module.exports = function (grunt) {
  return {
    coverage: {
      options: {
        coveralls: true
      }
    },
    cov: {
      options: {
        reporter: 'html-cov',
        quiet: false,
        output: 'reports/coverage.html'
      }
    },
    test: {
      options: {
        reporter: 'spec'
      }
    },
    options: {
      files: 'test/node/**/*.js'
    }
  };
};
