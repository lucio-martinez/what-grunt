angular.module('templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/top-navbar/top-navbar.html',
    "<div layout=column layout-fill><md-sidenav md-component-id=left class=md-sidenav-left><md-toolbar><div class=md-toolbar-tools><span>Navigation</span></div></md-toolbar><md-content><md-list><md-list-item><a href=\"#/\">Home</a></md-list-item><md-list-item><a href=#/about>About</a></md-list-item></md-list></md-content></md-sidenav><md-toolbar><div class=md-toolbar-tools><span>What grunt?</span> <span flex></span><md-button ng-click=openLeftMenu()>Open Sidebar</md-button></div></md-toolbar></div>"
  );


  $templateCache.put('routes/about/about.html',
    "<section layout=row layout-sm=column layout-align=\"center center\" layout-wrap><h1>About this</h1><p>This is a demonstration of how to setup grunt to compile front end projects. Thanks for taking a look!</p><p>You can see the source code for grunt tasks and this app in <a href=https://github.com/lucio-martinez/what-grunt>GitHub</a>.</p><md-button class=md-primary ng-href=\"#/\">Go back</md-button></section>"
  );


  $templateCache.put('routes/index/index.html',
    "<section layout=row layout-sm=column layout-align=\"center center\" layout-wrap><h1>Hello, my fellows!</h1><p>This is an AngularJS app and it's being compiled with <a href=\"http://gruntjs.com/\">grunt</a>.</p><md-button class=md-primary ng-href=#/about>Learn more</md-button></section>"
  );

}]);
