;(function(undefined) {
  'use strict';
  define(['./module'], function (directives) {
    directives.directive('tlParallax', ['$window', function ($window) {
      return {
        'restrict': 'E',
        'replace': true,
        'transclude': true,
        'template':['<div class="tl-parallax-container">',
                      '<div class="tl-parallax-bg" style="background-image:url({{src}})"></div>',
                      '<div class="tl-parallax-flare"></div>',
                      '<div class="tl-parallax-content" data-ng-transclude></div>',
                    '</div>'].join(''),
        'scope': {
          'src':"=src",
          'limit':"=limit",
          'easing':"=easing"
        },

        'controller': function($scope/*, $element*/) {
          $scope.midpoint = { x: $window.innerWidth/2, y: $window.innerHeight/2  };
          $scope.target = { x: 0, y:  0 };
          $scope.pos = { x: 0, y:  0 };

          $scope.mouseMove = function(e) {
            $scope.target.x = -(e.pageX - $scope.midpoint.x) / $scope['limit'].x;
            $scope.target.y = -(e.pageY - $scope.midpoint.y) / $scope['limit'].y;
          };

          $scope.deviceMove = function(a){
            $scope.target.x = a.gamma * 2;
            $scope.target.y = a.beta * 3;
          };

          $scope.update = function(){
            $scope.pos.x += ($scope.target.x - $scope.pos.x) * $scope.easing;
            $scope.pos.y += ($scope.target.y - $scope.pos.y) * $scope.easing;
            $scope.draw();
          };

          $scope.draw = function() {
            var matrix = '';
            if ($scope.bg) {
              matrix = ["matrix(1, 0, 0, 1, ", $scope.pos.x, ', ', $scope.pos.y, ')'].join('');
              $scope.bg.css({
                "-webkit-transform": matrix,
                   "-moz-transform": matrix,
                    "-ms-transform": matrix,
                     "-o-transform": matrix,
                        "transform": matrix
              });
            }

            if ($scope.flare) {
              matrix = ["matrix(1, 0, 0, 1, ", -$scope.pos.x, ', ', -$scope.pos.y, ')'].join('');
              $scope.flare.css({
                "-webkit-transform": matrix,
                   "-moz-transform": matrix,
                    "-ms-transform": matrix,
                     "-o-transform": matrix,
                        "transform": matrix
              });
            }
          };

          var isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
          if(isMobile && $window.DeviceOrientationEvent) {
            $scope.limit = $scope.limit.device;
            $window.addEventListener('deviceorientation', $scope.deviceMove, false);
          } else {
            $window.addEventListener('mousemove', $scope.mouseMove, false);
          }
        },

        'link': function($scope, $element/*, attrs*/) {
          $scope.bg = $element.find('.tl-parallax-bg');
          $scope.flare = $element.find('.tl-parallax-flare');

          // Size page
          var resize = function() {
            $scope.bg.css({
              "position":"absolute",
              "width" : 100 +  $scope.limit.x + "%",
              "height" : 100 + $scope.limit.y + "%",
              "left" : -$scope.limit.x/2+'%',
              "top" : -$scope.limit.y/2+'%'
            });

            $scope.flare.css({
              "width": 100 +  $scope.limit.x + "%",
              "height": 100 + $scope.limit.y + "%"
            });
          };

          $scope.$watch('src', function() {
            resize();
          });

          $window.addEventListener('resize', function() {
            $scope.midpoint = { x: $window.innerWidth/2, y: $window.innerHeight/2  };
            resize();
          });

          var render = function() {
            $scope.update();
            $window.requestAnimationFrame(function () {
              render();
            });
          };

          // Start Render Loop
          render();
        }
      };
    }]);
  });
}());