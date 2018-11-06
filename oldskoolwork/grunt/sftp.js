module.exports = function (grunt) {

  return {
    test: {
      files: {
        './': 'src/core/**'
      },
      options: {
        username: '<%= grunt.sftp.username %>',
        host: '<%= grunt.sftp.host %>',
        path: '/home/awillis/tmp/srctest',
        agent: 'pageant',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(777, 8)
      }
    }
  };
};
