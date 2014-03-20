;(function(undefined) {
  define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      $routeProvider.when('/:zipcode', {
        controller: 'WeatherCtrl',
        templateUrl: 'main-view.html'
      });
      $routeProvider.when('/:zipcode/:units', {
        controller: 'WeatherCtrl',
        templateUrl: 'main-view.html'
      });

      $routeProvider.otherwise({
        redirectTo: '/',
        controller: 'WeatherCtrl',
        templateUrl: 'main-view.html'
      });

      $locationProvider.html5Mode(false);
      $locationProvider.hashPrefix('!');
    }]);
  });
}());