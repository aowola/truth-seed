;(function(undefined) {
  'use strict';
  define(['./module'], function (directives) {
    directives.directive('tlWeather', ['$log', 'WeatherService', function ($log, $weather) {
      return {
        'restrict': 'E',
        'replace': true,
        'templateUrl':"partials/weather.html",
        'scope': {
          'zipcode':"=zipcode",
          'units':"=units",
          'mode':"=mode"
        },
        'controller': function(/*$scope, $element*/) {
        },
        'link': function($scope/*, $element, attrs*/) {
          $scope.$watch('zipcode', function(zipcode) {
            if(/^\d{5}(-\d{4})?$/.test(zipcode)){
              $weather.get(zipcode, $scope['mode'])
              ['then'](function(data) {
               if(data) {
                if(data['error']) {
                  $log.log(data['detail']);
                } else {
                  $scope.weather = data;
                }
               }
              });
            }
          });
        }
      };
    }]);
  });
}());