'use strict';

angular.module('whatGruntDesktop.components.topNavbarDirective', [])
.directive('topNavbar', [
  '$location',
  function($location) {
    return {
      restrict: 'E',
      templateUrl: 'components/top-navbar/top-navbar.html',
      link: function(scope) {
        scope.isActive = function(path) {
          return path === $location.path();
        };
      }
    };
  }
]);
