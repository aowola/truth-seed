;(function(undefined) {
  'use strict';
  define([
      'angular',
      'angular-route',
      './services/index',
      './controllers/index',
      './directives/index',
      './filters/index'
  ], function (angular) {
    return angular.module('app', [
      'ngRoute',
      'app.services',
      'app.controllers',
      'app.directives',
      'app.filters'
    ]).constant('weather-api', {
        'url': '/weather/',
        'endpoints': {
          'conditions': 'conditions/q/{zipcode}.json',
          'forecast10day': 'forecast10day/q/{zipcode}.json'
        }
      });
  });
}());