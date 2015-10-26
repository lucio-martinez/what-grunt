module.exports = function(grunt) {

  /**
   * Thanks a lot to Scott Rippey!
   * Developer of this structure!
  */

  //require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var paths = require('./paths.js');

  grunt.initConfig({
    paths: paths,
    desktop: {
      version: '0.0.1'
    },
    mobile: {
      version: '0.0.1'
    }
  });

  require(paths.tasks+'/default-options.js')(grunt, paths);
  require(paths.tasks+'/default-tasks.js')(grunt, paths);
  require(paths.tasks+'/desktop-all.js')(grunt, paths);
  require(paths.tasks+'/mobile-all.js')(grunt, paths);

};
