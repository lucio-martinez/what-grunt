module.exports = function(grunt, paths) {

  /**
   * I am not fully sure of how much safe it
   * is to run this, but 60% faster is 'nuff.
   */
  grunt.config.merge({
    concurrent: {
      'build': [
        'desktop-prod',
        'mobile-prod'
      ]
    }
  });

  grunt.registerTask('default', 'Builds all desktop and mobile packages', [
    'concurrent:build'
  ]);

  grunt.registerTask('desktop', 'Builds desktop package', [
    'desktop-prod'
  ]);

  grunt.registerTask('mobile', 'Builds mobile package', [
    'mobile-prod'
  ]);

  grunt.registerTask('watch-desktop', 'Watch desktop project', [
    'desktop-dev'
  ]);

  grunt.registerTask('watch-mobile', 'Watch mobile project', [
    'mobile-dev'
  ]);

  grunt.registerTask('all-verify', 'Validates all desktop and mobile scripts', [
    'desktop-verify',
    'mobile-verify'
  ]);
};
