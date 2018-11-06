module.exports = function (grunt) {
  return {
    test: {
      src: ['test/browser/test.html'],
      options: {
        mocha: {
          ignoreLeaks: false
        },
        coverage: {
          coverageFile: 'reports/myCoverage.json'
        },
        reporter: 'Spec',
        run: true,
        timeout: 10000
      }
    },
    test2: {
      src: ['test/browser/test.html'],
      options: {
        mocha: {
          ignoreLeaks: false
        },
        reporter: 'Spec',
        run: true,
        timeout: 10000
      }
    }
  };
};
