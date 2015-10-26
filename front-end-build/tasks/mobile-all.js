module.exports = function(grunt, paths) {

  /**
   * This is a custom step for usemin task.
   * Copy the cssmin config for autoprefixer.
   * Reason? There isn't one by default..
   */
  var useminAutoprefixer = {
    name: 'autoprefixer',
    createConfig: function(context, block) {
      if (block.src.length === 0) {
        return {};
      } else {
        return require('grunt-usemin/lib/config/cssmin').createConfig(context, block);
      }
    }
  };


  grunt.config.merge({
    clean: {
      'mobile-dev': '<%= paths.front_end_build %>/.tmp/mobile',
      'mobile-prod': {
        files: [{
          dot: true,
          src: [
            '<%= paths.front_end_build %>/.tmp/mobile',
            '<%= paths.mobile_dist %>/*',
            '!<%= paths.mobile_dist %>/.git*'
          ]
        }]
      }
    },
    wiredep: {
      mobile: {
        directory: '<%= paths.mobile %>/bower_components',
        src: ['<%= paths.mobile %>/index.html'],
        bowerJson: grunt.file.readJSON(paths.front_end_build+'/mobile/bower.json')
      },
    },
    less: {
      mobile: {
        options: {
          paths: ['<%= paths.mobile %>']
        },
        files: {
          '<%= paths.mobile %>/assets/styles/main.css': '<%= paths.mobile %>/assets/styles/main.less'
        }
      }
    },
    jshint: {
      mobile: [
        '<%= paths.patterns.mobile_src %>',
        '!<%= paths.mobile %>/src/templates.js'
      ]
    },
    ngtemplates: {
      'mobile-dev': {
        cwd: '<%= paths.mobile %>/src',
        src: ['**/*.html'],
        dest: '<%= paths.mobile %>/src/templates.js',
        options: {
          module: 'templates',
          standalone: true,
        }
      },
      'mobile-prod': {
        cwd: '<%= paths.mobile %>/src',
        src: ['**/*.html'],
        dest: '<%= paths.mobile %>/src/templates.js',
        options: {
          module: 'templates',
          standalone: true,
          htmlmin: {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }
      }
    },
    /**
     * This is a gaiantic task even if it doesn't look like so.
     * 
     * It will concatenates several files into one
     * saving them into a temporary directory.
     *
     * After that, the same tmp files will be processed
     * by a minifier and save them in the prod directory.
     *
     * I recommend taking a look at the index.html
     * since this will read the build comments there.
     */
    useminPrepareMobile: {
      html: '<%= paths.mobile %>/index.html',
      options: {
        staging: '<%= paths.front_end_build %>/.tmp/mobile',
        dest: '<%= paths.mobile_dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin', useminAutoprefixer]
            }
          }
        }
      }
    },
    // Put files not handled in other tasks here
    copy: {
      mobile: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= paths.mobile %>',
          dest: '<%= paths.mobile_dist %>',
          src: [
            'index.html',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= paths.front_end_build %>/.tmp/mobile/assets/images',
          dest: '<%= paths.mobile_dist %>/assets/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    useminMobile: {
      html: ['<%= paths.mobile_dist %>/index.html']
    },
    imagemin: {
      mobile: {
        files: [{
          expand: true,
          cwd: '<%= paths.mobile %>/assets/images',
          src: '*.{png,jpg,jpeg,gif,webp,svg}', 
          dest: '<%= paths.mobile_dist %>/assets/images'
        }]
      }
    },
    htmlmin: {
      mobile: {
        options: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.mobile_dist %>',
          src: ['index.html'],
          dest: '<%= paths.mobile_dist %>'
        }]
      }
    },
    watchMobile: {
      html: {
        files: ['<%= paths.patterns.mobile_html %>'],
        tasks: ['ngtemplates:mobile-dev']
      },
      less: {
        files: [
          '<%= paths.mobile %>/assets/styles/*.less',
          '<%= paths.patterns.mobile_less %>'
        ],
        tasks: ['less:mobile']
      }
    },
    browserSync: {
      mobile: {
        bsFiles: {
          src : [
            '<%= paths.patterns.mobile_src %>',
            '<%= paths.patterns.mobile_css %>',
            '<%= paths.patterns.mobile_images %>',
            '<%= paths.mobile %>/src/templates.js',
            '<%= paths.mobile %>/index.html'
          ]
        }
      }
    }
  });


  grunt.config.merge({
    concurrent: {
      'mobile-dev': [
        'less:mobile',
        'wiredep:mobile'
      ],
      'mobile-prod': [
        'less:mobile',
        'wiredep:mobile'
      ]
    }
  });


  grunt.registerTask('mobile-verify', [
    'jshint:mobile'
  ]);


  grunt.registerTask('watchMobile', function () {
    var config = grunt.config('watchMobile');
    grunt.config.set('watch', config);
    grunt.task.run('watch');
  });

  grunt.registerTask('mobile-dev', [
    'clean:mobile-dev',
    'ngtemplates:mobile-dev',
    'concurrent:mobile-dev',
    'browserSync:mobile',
    'watchMobile'
  ]);


  grunt.registerTask('useminPrepareMobile', function () {
    var config = grunt.config('useminPrepareMobile');
    grunt.config.set('useminPrepare', config);
    grunt.task.run('useminPrepare');
  });

  grunt.registerTask('useminMobile', function () {
    var config = grunt.config('useminMobile');
    grunt.config.set('usemin', config);
    grunt.task.run('usemin');
  });

  grunt.registerTask('mobile-prod', [
    'mobile-verify',
    'clean:mobile-prod',
    'ngtemplates:mobile-prod',
    'concurrent:mobile-prod',
    'useminPrepareMobile',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    'autoprefixer:generated',
    'copy:mobile',
    'useminMobile',
    'imagemin:mobile',
    'htmlmin:mobile'
  ]);
};
