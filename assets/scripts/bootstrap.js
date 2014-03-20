;(function(document, undefined) {
  'use strict';
  /**
   * bootstraps angular onto the window.document node
   */
  define([
    'require',
    'angular',
    'domReady',
    './app',
    './routes'
   ], function (require, angular, domReady) {
      require([], function () {
        domReady(function() {
          angular.bootstrap(document, ['app']);
          if (!("ontouchstart" in document.documentElement)){ 
            document.documentElement.className += " no-touch"; 
          }
        });
      });
    });
}(document));