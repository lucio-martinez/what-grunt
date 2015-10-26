var root = '..',
  front_end_build = '.';

var paths = {
  root: root,
  front_end_build: front_end_build,
  desktop: root + '/webapps/desktop',
  desktop_dist: root + '/webapps/desktop/dist',
  mobile: root + '/webapps/mobile',
  mobile_dist: root + '/webapps/mobile/dist',
  tasks: front_end_build + '/tasks'
};

var patterns = {
  src: '/src/**/*.js',
  html: '/src/**/*.html',
  tests: '/src/**/*.spec.js',
  css: '/assets/styles/*.css',
  less: '/src/**/*.less',
  images: '/assets/images/*.{png,jpg,jpeg,gif,webp,svg}'
};

paths.patterns = {};

['desktop', 'mobile', 'desktop_dist', 'mobile_dist'].forEach(function(pathName) {
  Object.keys(patterns).forEach(function(patternName) {
    // give paths obj a property whose name is a combo of namespace + pattern
    // e.g. paths.patterns.mobile_tests = paths.mobile + patterns.tests
    // =>	'/webapps/mobile/src/**/*.spec.js'
    paths.patterns[pathName + '_' + patternName] = paths[pathName] + patterns[patternName];
  });
});

module.exports = paths;
