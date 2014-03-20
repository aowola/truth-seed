;(function(undefined) {
  'use strict';
  define(['angular', './module'], function (angular, controllers) {  
    controllers.controller('WeatherCtrl', ['$scope', '$location', '$routeParams', function ($scope, $location, $params) {
      $scope['settings'] = {
        "zipcode": $params['zipcode'] || 93920,
        "units": $params['units'] || "fahrenheit",
        "parallax": {
          "easing": 0.1,
          "src": ['/img/', $params['zipcode'] || 93920, '.jpg'].join(''),
          "limit": {
            'x': 20,  
            'y': 20 ,
            'device': {
              'x':30,
              'y':35
            }
          }
        }
      };

      $scope.menu = {
        isactive: false 
      };

      $scope.events = {
        menu: function($event) {
          if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
          }
          $scope.menu.isactive = true;
          angular.element('body').addClass('tl-menu-animate-active');
        }
      };

      $scope.$watch('settings.zipcode', function(zipcode) {
        if (/^\d{5}(-\d{4})?$/.test(zipcode)) {
          $scope['settings']['parallax']['src'] = ['/img/', zipcode, '.jpg'].join('');
        }
      });

      $scope.$watch('menu.isactive', function(isactive, previous) {
        if (!isactive && previous) {
          angular.element('body').removeClass('tl-menu-animate-active');
        }
      });
   }]);
  });
}());