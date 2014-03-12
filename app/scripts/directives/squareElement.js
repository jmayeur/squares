(function (angular) {
    'use strict';

    angular.module('squares').directive('squareElement', [ function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                square: '=square',
                scoreGame: '=endGame',
                gameStarted: '=gameStarted',
                selectedColor: '=selectedColor',

                outline : '=outline'
            },
            template: '<div class="square" ng-click="handleClick(square, $event)"></div>',
            link: function (scope, element, attrs) {

                var s = scope.square;

                scope.$watch('gameStarted', function(){
                    var val = scope.outline(s.Color);
                    element.css('outline', val);
                });

                element.css('background-color', 'rgba('
                    + s.Color.R + ','
                    + s.Color.G + ','
                    + s.Color.B + ','
                    + s.Color.A + ')');

                element.css('height', s.H + 'px');
                element.css('width', s.W + 'px');

                scope.handleClick = function(square, $event){
                    $event.stopPropagation();
                    if (!scope.gameStarted){
                        return;
                    }
                    scope.scoreGame(square);

                };
            }
        };
    }]);

})(angular);