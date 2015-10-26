angular.module('templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/top-navbar/top-navbar.html',
    "<nav class=\"navbar navbar-inverse\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#navbar-collapse aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href=\"#/\">What grunt?</a></div><div class=\"collapse navbar-collapse\" id=navbar-collapse><ul class=\"nav navbar-nav\"><li ng-class=\"{'active': isActive('/')}\"><a href=\"#/\">Home</a></li><li ng-class=\"{'active': isActive('/about')}\"><a href=#/about>About</a></li></ul></div></div></nav>"
  );


  $templateCache.put('routes/about/about.html',
    "<section class=about><h1>Hi there,</h1><p class=message>This is a demonstration of how to setup grunt to compile front end projects. Thanks for taking a look!</p><p class=message>You can see the source code for grunt tasks and this app in <a href=https://github.com/lucio-martinez/what-grunt>GitHub</a>.</p><p class=italic>Background picture from <a href=https://twitter.com/bocoup/status/250344428559020032 target=_blank>Bocoup</a>.</p></section>"
  );


  $templateCache.put('routes/index/index.html',
    "<section><div class=jumbotron><h1>Hello, my fellows!</h1><p>This is an AngularJS app and it's being compiled with <a href=\"http://gruntjs.com/\" target=_blank>grunt</a>.</p><a class=\"btn btn-primary btn-lg\" href=#/about role=button>Learn more</a></div></section>"
  );

}]);
