'use strict';

angular.module('whatGruntMobile.components.topNavbarDirective', [])
.directive('topNavbar', [
  '$mdSidenav',
  function($mdSidenav) {
    return {
      restrict: 'E',
      templateUrl: 'components/top-navbar/top-navbar.html',
      link: function(scope) {
        scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
      }
    };
  }
]);
