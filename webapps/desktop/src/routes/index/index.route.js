'use strict';

angular.module('whatGruntDesktop.routes.indexRoute', [])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'routes/index/index.html'
    });
  }
]);
