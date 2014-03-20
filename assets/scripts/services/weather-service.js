;(function(undefined) {
  'use strict';
  define(['./module'], function (services) {
    services.service('WeatherService', ['$http', 'weather-api', function ($http, $api) {
      var MODE = {
        CURRENT: 'current',
        FIVEDAY: 'five-day'
      };
     
      var API = function(url, endpoints) {
        this.endpoints = {};
        for (var endpoint in endpoints) {
          if (endpoints.hasOwnProperty(endpoint)) {
            this.endpoints[endpoint] = url + endpoints[endpoint];
          }
        }
      };

      API.prototype.parseResponse = function(data) {
        if(data['response'] && data['response']['features'] && data['response']['features']['forecast10day']) {
          return data['forecast']['simpleforecast']['forecastday'].map(function(day) {
            return {
              'conditions': day['conditions'],
              'weekday': day['date']['weekday_short'],
              'icon': day['icon'],
              'high': day['high'],
              'low': day['low']
            };
          });
        } else if(data['response'] && data['response']['features'] &&  data['response']['features']['conditions']) {
          return {
            'current': {
              'celsius': data['current_observation']['temp_c'],
              'fahrenheit': data['current_observation']['temp_f']
            },
            'conditions': data['current_observation']['weather'],
            'icon': data['current_observation']['icon'],
            'location': {
              'city':data['current_observation']['display_location']['city'],
              'country':data['current_observation']['display_location']['country_iso3166'],
              'state_name':data['current_observation']['display_location']['state_name']
            }
          };
        } else {
          // Provide Error information
          return this.parseError('parseResponse error.');
        }
      };

      API.prototype.parseError = function(detail) {
        return { 'error': true, 'detail': detail };
      };

      var weatherAPI = new API($api['url'], $api['endpoints']);
      
      return {
        get:function(zipcode, mode) {
          var endpoint = (mode === MODE.CURRENT ? 'conditions' : 'forecast10day'),
          url = weatherAPI.endpoints[endpoint].replace('{zipcode}', zipcode);
          return $http({'method':'GET', 'url': url})
          ['then'](function(response) {
            if(response && response.data) {
              if(response.data['response'] && response.data['response']['error']) {
                return weatherAPI.parseError(response.data['response']['error']);
              } else {
                return weatherAPI.parseResponse(response.data);
              }
            }
          }, function(failure) {
            return weatherAPI.parseError(failure);
          });
        }
      };
    }]);
  });
}());