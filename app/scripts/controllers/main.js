(function (angular) {
    'use strict';


    angular.module('squares')
        .controller('MainCtrl', ['$scope', 'gameService',
            function ($scope, gameService) {

                $scope.squareRows = [];
                $scope.firstGameStarted = false;

                $scope.retry = function () {
                    gameService.RestartGame();
                };

                $scope.next = function () {
                    $scope.squareRows = gameService.StartGame();
                };

                $scope.gameData = gameService;
                $scope.startGame = function () {
                    $scope.squareRows = gameService.StartGame();
                    $scope.firstGameStarted = true;
                };

                $scope.setGameMode = function (mode) {
                    if (gameService.GameStarted){
                        return false;
                    }

                    gameService.SetGameMode(mode);

                };

                $scope.getOutline = function (color) {
                    if (color === gameService.SelectedColor) {
                        var outlineColor = '#fff';

                        var currentHex = color.GetHexColor();
                        if (parseInt(currentHex, 16) > 0xffffff / 2) {
                            outlineColor = '#aaa';
                        }
                        return '2px dashed ' + outlineColor;
                    }
                    return '0';
                }
            }]);
}(angular));