'use strict';

angular.module('whatGruntMobile.routes.indexRoute', [])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'routes/index/index.html'
    });
  }
]);
