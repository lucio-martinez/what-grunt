module.exports = function(grunt, paths) {

  grunt.config.merge({
    /**
     * Clean the directories that are
     * obsolete for a new grunt to be run,
     * like tmp or old production versions.
     */
    clean: {
      'desktop-dev': '<%= paths.front_end_build %>/.tmp/desktop',
      'desktop-prod': {
        files: [{
          dot: true,
          src: [
            '<%= paths.front_end_build %>/.tmp/desktop',
            '<%= paths.desktop_dist %>/*',
            '!<%= paths.desktop_dist %>/.git*'
          ]
        }]
      }
    },
    less: {
      desktop: {
        options: {
          paths: ['<%= paths.desktop %>']
        },
        files: {
          '<%= paths.desktop %>/assets/styles/main.css': '<%= paths.desktop %>/assets/styles/main.less'
        }
      }
    },
    /**
     * Even if bower dependencies change,
     * this task will make sure to have all
     * them always injected in the index.html
     */
    wiredep: {
      desktop: {
        directory: '<%= paths.desktop %>/bower_components',
        src: ['<%= paths.desktop %>/index.html'],
        bowerJson: grunt.file.readJSON(paths.front_end_build+'/desktop/bower.json')
      },
    },
    /**
     * Instead of adding every new .js or .less file
     * into index.html and main.less respectively,
     * run this task after a new file is created
     * since they will be in an expected directory.
     */
    includeSource: {
      desktop: {
        files: {
          '<%= paths.desktop %>/index.html': '<%= paths.desktop %>/index.html.template',
          '<%= paths.desktop %>/assets/styles/main.less': '<%= paths.desktop %>/assets/styles/main.less.template'
        },
        options: {
          basePath: '<%= paths.desktop %>'
        }
      }
    },
    jshint: {
      desktop: [
        '<%= paths.patterns.desktop_src %>',
        '!<%= paths.desktop %>/src/templates.js'
      ]
    },
    /**
     * Concatenes every .html template into
     * one single js file to optimize exec.
     * Optimize them only for production.
     */
    ngtemplates: {
      'desktop-dev': {
        cwd: '<%= paths.desktop %>/src',
        src: ['**/*.html'],
        dest: '<%= paths.desktop %>/src/templates.js',
        options: {
          module: 'templates',
          standalone: true,
        }
      },
      'desktop-prod': {
        cwd: '<%= paths.desktop %>/src',
        src: ['**/*.html'],
        dest: '<%= paths.desktop %>/src/templates.js',
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
     * Creates the concat:generated task to put
     * together major souces into single files:
     * main.js, main.css, vendor.js and vendor.css
     */
    useminPrepareDesktop: {
      html: '<%= paths.desktop %>/index.html',
      options: {
        staging: '<%= paths.front_end_build %>/.tmp/desktop'
      }
    },
    uglify: {
      desktop: {
        files: {
          '<%= paths.desktop_dist %>/src/app.js': '<%= paths.front_end_build %>/.tmp/desktop/concat/src/app.js',
          '<%= paths.desktop_dist %>/src/vendor.js': '<%= paths.front_end_build %>/.tmp/desktop/concat/src/vendor.js'
        }
      }
    },
    /**
     * Use separated tasks between own and vendor styles.
     * Minify the files is needed but adding browser prefixes 
     * to third party code is a bit too much IMO.
     */
    postcss: {
      desktop: {
        src: '<%= paths.front_end_build %>/.tmp/desktop/concat/assets/styles/main.css'
      },
      'desktop-vendor': {
        options: {
          processors: [
            require('cssnano')
          ]
        },
        src: '<%= paths.front_end_build %>/.tmp/desktop/concat/assets/styles/vendor.css'
      }
    },
    // Put files not handled in other tasks here
    copy: {
      desktop: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= paths.desktop %>',
          dest: '<%= paths.desktop_dist %>',
          src: [
            'index.html',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= paths.front_end_build %>/.tmp/desktop/concat/assets/images',
          dest: '<%= paths.desktop_dist %>/assets/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '<%= paths.front_end_build %>/.tmp/desktop/concat/assets/styles',
          dest: '<%= paths.desktop_dist %>/assets/styles',
          src: [
            '*.css'
          ]
        }]
      }
    },
    /**
     * After having used useminPrepare and 
     * files optimized and spitted them on
     * prod the index.html reference needs
     * to be updated, this task will do it.
     */
    useminDesktop: {
      html: ['<%= paths.desktop_dist %>/index.html']
    },
    imagemin: {
      desktop: {
        files: [{
          expand: true,
          cwd: '<%= paths.desktop %>/assets/images',
          src: '*.{png,jpg,jpeg,gif,webp,svg}', 
          dest: '<%= paths.desktop_dist %>/assets/images'
        }]
      }
    },
    htmlmin: {
      desktop: {
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
          cwd: '<%= paths.desktop_dist %>',
          src: ['index.html'],
          dest: '<%= paths.desktop_dist %>'
        }]
      }
    },
    /**
     * Every file declared here will execute 
     * a task which is also declared here.
     */
    watchDesktop: {
      generated: {
        files: [
          '<%= paths.desktop %>/index.html.template', 
          '<%= paths.desktop %>/assets/styles/main.less.template'
        ],
        tasks: ['includeSource:desktop']
      },
      html: {
        files: ['<%= paths.patterns.desktop_html %>'],
        tasks: ['ngtemplates:desktop-dev']
      },
      styles: {
        files: [
          '<%= paths.desktop %>/assets/styles/*.less', 
          '<%= paths.patterns.desktop_less %>'
        ],
        tasks: ['less:desktop']
      }
    },
    /**
     * Proxy to share one instance among
     * several devices through browsers.
     */
    browserSync: {
      desktop: {
        bsFiles: {
          src : [
            '<%= paths.patterns.desktop_src %>',
            '<%= paths.patterns.desktop_css %>',
            '<%= paths.patterns.desktop_images %>',
            '<%= paths.desktop %>/src/templates.js',
            '<%= paths.desktop %>/index.html'
          ]
        }
      }
    }
  });


  // Files that don't mess with each other
  grunt.config.merge({
    concurrent: {
      'desktop-dev': [
        'less:desktop',
        'wiredep:desktop'
      ],
      'desktop-prod': [
        'less:desktop',
        'wiredep:desktop'
      ]
    }
  });


  // Leave this little tasks separately
  // to be exec. directly from outside.

  grunt.registerTask('desktop-verify', [
    'jshint:desktop'
  ]);


  grunt.registerTask('watchDesktop', function () {
    var config = grunt.config('watchDesktop');
    grunt.config.set('watch', config);
    grunt.task.run('watch');
  });

  grunt.registerTask('desktop-dev', [
    'clean:desktop-dev',
    'ngtemplates:desktop-dev',
    'includeSource:desktop',
    'concurrent:desktop-dev',
    'browserSync:desktop',
    'watchDesktop'
  ]);


  grunt.registerTask('useminPrepareDesktop', function () {
    var config = grunt.config('useminPrepareDesktop');
    grunt.config.set('useminPrepare', config);
    grunt.task.run('useminPrepare');
  });

  grunt.registerTask('useminDesktop', function () {
    var config = grunt.config('useminDesktop');
    grunt.config.set('usemin', config);
    grunt.task.run('usemin');
  });

  grunt.registerTask('desktop-prod', [
    'desktop-verify',
    'clean:desktop-prod',
    'ngtemplates:desktop-prod',
    'includeSource:desktop',
    'concurrent:desktop-prod',
    'useminPrepareDesktop',
    'concat:generated',
    'uglify:desktop',
    'postcss:desktop',
    'postcss:desktop-vendor',
    'copy:desktop',
    'useminDesktop',
    'imagemin:desktop',
    'htmlmin:desktop'
  ]);
};
