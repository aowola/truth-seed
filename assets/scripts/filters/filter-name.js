;(function() {
  'use strict';
  define(['./module'], function (filters) {  
    filters.filter('filter-name', [function () {
      return function(input/*, params*/) {
        return input;
      };
    }]);
  });
}());
