(function (angular) {
    'use strict';

    angular.module('squares').factory('gameService', ['$interval', '$timeout', 'colorService', 'squareService',
        function ($interval, $timeout, colorService, squareService) {
            var gameServiceInstance;

            gameServiceInstance = {
                _:{
                    squares: null,
                    retryCount: 0,
                    intervalId: null,
                    streakData: { Count: 0, Text: 'Wins', LastGameWon: false },
                    colorCounts: {},
                    colorProvider: colorService.SimpleColors,
                    initialSeconds: 8,

                    getSquares: function (colorCounts, colorProvider) {
                        var squareRows = [];

                        for (var row = 0; row < 8; row++) {
                            var rowArray = [];
                            for (var col = 0; col < 8; col++) {
                                var color,
                                    colorId,
                                    colorIndex;

                                colorIndex = Math.round(Math.random() * colorProvider.Max);
                                color = colorProvider.GetColor(colorIndex);
                                colorId = color.GetColorId();

                                if (!colorCounts[colorId]) {
                                    colorCounts[colorId] = 0;
                                }
                                colorCounts[colorId]++;

                                rowArray.push(squareService.GetSquare(50, color));
                            }
                            squareRows.push(rowArray)
                        }
                        return squareRows;
                    },

                    getSecondScore:  function (gameMode) {
                        var result = 0;
                        switch (gameMode) {
                            case gameServiceInstance.GameModes.Simple:
                                result = 1000;
                                break;
                            case gameServiceInstance.GameModes.Medium:
                                result = 1500;
                                break;
                            case gameServiceInstance.GameModes.Hard:
                                result = 2500;
                                break;
                            case gameServiceInstance.GameModes.VeryHard:
                                result = 5000;
                                break;
                        }
                        return result;
                    },

                    getCurrentStreak : function (gameWon, streakData) {
                        if (gameWon) {
                            if (streakData.LastGameWon) {
                                streakData.Count++;
                                if (streakData.Count === 1) {
                                    streakData.Text = 'Win';
                                }
                                else {
                                    streakData.Text = 'Wins';
                                }
                            }
                            else {
                                streakData.Count = 1;
                                streakData.Text = 'Win';
                            }

                            streakData.LastGameWon = true;
                        }
                        else {
                            if (!streakData.LastGameWon) {
                                streakData.Count++;
                                if (streakData.Count === 1) {
                                    streakData.Text = 'Loss';
                                }
                                else {
                                    streakData.Text = 'Losses';
                                }
                            }
                            else {
                                streakData.Count = 1;
                                streakData.Text = 'Loss';
                            }
                            streakData.LastGameWon = false;
                        }

                        return streakData.Count + ' ' + streakData.Text;
                    },

                    scoreGame: function (chosenSquare, colorCounts, gameMode, seconds, retryCount) {
                        var result = {
                            gameWon : false,
                            score : 0
                        };

                        if (!(null === chosenSquare || undefined === chosenSquare)) {

                            var gameWon = true,
                                chosenColorId = chosenSquare.Color.GetColorId();


                            for(var colorId in colorCounts){
                               if (colorCounts.hasOwnProperty(colorId)
                                   && colorId !== chosenColorId
                                   && colorCounts[colorId] > colorCounts[chosenColorId]) {

                                    gameWon = false;
                                    break;
                                }
                            }

                            if (gameWon){
                                var scoreMod = gameServiceInstance._.getSecondScore(gameMode);
                                var score = scoreMod * seconds;
                                if (retryCount > 0) {
                                    score = Math.round(score / (retryCount + 1));
                                }
                                result.gameWon = true;
                                result.score =  score;
                            }
                        }

                        return result;
                    },

                    initGame : function(initialSeconds){
                        gameServiceInstance._.colorCounts = {};
                        gameServiceInstance.OutcomeText = '';
                        gameServiceInstance.LastGameWon = false;
                        gameServiceInstance.GameStarted = true;
                        gameServiceInstance.Seconds = initialSeconds;
                        gameServiceInstance.GameOver = false;
                        gameServiceInstance.SelectedColor = null;
                    },

                    cancelCountDown: function (intervalId) {
                        if(null !== intervalId){
                            try {
                                $interval.cancel(intervalId);
                                intervalId = null;
                            }
                            catch (e) {
                                console.log('Failed to cancel intervalId [' + intervalId + '] ' + e);
                            }
                        }
                    },

                    countDown: function () {
                        var intervalId;

                        intervalId = $interval(function () {
                            gameServiceInstance.Seconds--;
                            if (gameServiceInstance.Seconds <= 0) {
                                gameServiceInstance._.cancelCountDown(gameServiceInstance._.intervalId);
                                gameServiceInstance.EndGame(null);
                            }

                        }, 1000);

                        return intervalId;
                    },

                    startCountDown: function(){
                        $timeout(function () {
                            gameServiceInstance._.intervalId = gameServiceInstance._.countDown();
                        });
                    }

                },
                OutcomeText: '',
                Seconds: 0,
                LastGameWon: false,
                GameOver: false,
                CurrentStreak: '0 Wins',
                Score: 0,
                TotalGamesPlayed: 0,
                GameStarted: false,
                GameModes: {
                    Simple: 'simple',
                    Medium: 'medium',
                    Hard: 'hard',
                    VeryHard: 'veryhard'
                },
                GameMode: 'simple',
                SelectedColor: null,
                SetGameMode: function (mode) {
                    switch (mode) {
                        case gameServiceInstance.GameModes.Simple:
                            gameServiceInstance.GameMode = gameServiceInstance.GameModes.Simple;
                            gameServiceInstance._.colorProvider = colorService.SimpleColors;
                            gameServiceInstance._.initialSeconds = 8;
                            break;

                        case gameServiceInstance.GameModes.Medium:
                            gameServiceInstance.GameMode = gameServiceInstance.GameModes.Medium;
                            gameServiceInstance._.colorProvider = colorService.MediumColors;
                            gameServiceInstance._.initialSeconds = 6;
                            break;

                        case gameServiceInstance.GameModes.Hard:
                            gameServiceInstance.GameMode = gameServiceInstance.GameModes.Hard;
                            gameServiceInstance._.colorProvider = colorService.HardColors;
                            gameServiceInstance._.initialSeconds = 4;
                            break;

                        case gameServiceInstance.GameModes.VeryHard:
                            gameServiceInstance.GameMode = gameServiceInstance.GameModes.VeryHard;
                            gameServiceInstance._.colorProvider = colorService.VeryHardColors;
                            gameServiceInstance._.initialSeconds = 4;
                            break;
                    }
                },
                StartGame: function () {
                    var squares;

                    gameServiceInstance._.initGame(gameServiceInstance._.initialSeconds);
                    gameServiceInstance._.retryCount = 0;
                    squares = gameServiceInstance._.getSquares(gameServiceInstance._.colorCounts, gameServiceInstance._.colorProvider);
                    gameServiceInstance._.startCountDown();
                    return squares;
                },

                RestartGame: function () {
                    gameServiceInstance._.retryCount++;
                    gameServiceInstance._.initGame(gameServiceInstance._.initialSeconds);
                    gameServiceInstance._.startCountDown();
                },

                EndGame: function (chosenSquare) {
                    gameServiceInstance._.cancelCountDown(gameServiceInstance._.intervalId);
                    gameServiceInstance.GameStarted = false;
                    gameServiceInstance.GameOver = true;

                    var result = gameServiceInstance._.scoreGame(chosenSquare, gameServiceInstance._.colorCounts,
                        gameServiceInstance.GameMode, gameServiceInstance.Seconds, gameServiceInstance._.retryCount);

                    if(result.gameWon){
                        gameServiceInstance.WinningCount = gameServiceInstance._.colorCounts[chosenSquare.Color.GetColorId()];
                        gameServiceInstance.Score += result.score;
                    }

                    gameServiceInstance.SelectedColor = chosenSquare.Color;
                    gameServiceInstance.CurrentStreak = gameServiceInstance._.getCurrentStreak(result.gameWon, gameServiceInstance._.streakData);

                    gameServiceInstance.LastGameWon = result.gameWon;
                    gameServiceInstance.TotalGamesPlayed++;
                    gameServiceInstance.OutcomeText = (result.gameWon) ? 'WON!!!!' : 'LOST!!!!';

                }
            };

            return gameServiceInstance;
        }]);
}(angular));