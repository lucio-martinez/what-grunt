'use strict';

angular.module('whatGruntMobile.routes.aboutRoute', [])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'routes/about/about.html'
    });
  }
]);
