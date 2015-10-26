'use strict';

angular.module('whatGruntDesktop.routes.aboutRoute', [])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'routes/about/about.html'
    });
  }
]);
