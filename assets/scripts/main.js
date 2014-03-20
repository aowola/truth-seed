;(function(undefined) {
  'use strict';
  require.config({
   // alias libraries paths
    paths: {
      'jquery': '../vendor/jquery/jquery',
      'angular': '../vendor/angular/angular',
      'domReady': '../vendor/requirejs-domready/domReady',
      'angular-route': '../vendor/angular-route/angular-route'
    },
  
    // angular does not support AMD out of the box, put it in a shim
    shim: {
      'jquery': {
        exports: 'jquery'
      },
      'angular': {
        deps:['jquery'],
        exports: 'angular'
      },
      'angular-route': {
        deps:['angular']
      },
      'domReady': {
        exports: 'domReady'
      }
    },
 
    // kick start application
    deps: ['./bootstrap']
  });
}());
