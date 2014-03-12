(function(){
    'use strict';

    describe('Service: gameService', function () {

        var gameServiceInstance, colorServiceInstance, squareServiceInstance;

        // load the controller's module
        beforeEach(function(){
            module('squares');
            inject(function(gameService, colorService, squareService){
                gameServiceInstance = gameService;
                colorServiceInstance = colorService;
                squareServiceInstance = squareService;
            })

        });

        it('Should have "" by default for OutComeText', function(){

            expect(gameServiceInstance.OutcomeText).toEqual('');
        });


        it('should return an 8x8 Array of 50x50 of SquareModels when getSquares is called', function(){

            var colorCount = {};
            var result = gameServiceInstance._.getSquares(colorCount, colorServiceInstance.SimpleColors);

            expect(result.length).toBe(8);
            for(var r=0;r<8;r++){
                expect(result[r].length).toBe(8);
                for(var c=0;c<8;c++){
                    var square = result[r][c];
                    expect(square.H).toEqual(50);
                    expect(square.W).toEqual(50);
                }
            }
        });

        it('should return 1000 when getSecondScore is called with Simple', function(){
            var result = gameServiceInstance._.getSecondScore(gameServiceInstance.GameModes.Simple);
            expect(result).toEqual(1000);
        });

        it('should return 1500 when getSecondScore is called with Medium', function(){
            var result = gameServiceInstance._.getSecondScore(gameServiceInstance.GameModes.Medium);
            expect(result).toEqual(1500);
        });

        it('should return 2500 when getSecondScore is called with Hard', function(){
            var result = gameServiceInstance._.getSecondScore(gameServiceInstance.GameModes.Hard);
            expect(result).toEqual(2500);
        });

        it('should return 5000 when getSecondScore is called with VeryHard', function(){
            var result = gameServiceInstance._.getSecondScore(gameServiceInstance.GameModes.VeryHard);
            expect(result).toEqual(5000);
        });

        it('Should have "0 Wins" by default for CurrentStreak', function(){

            expect(gameServiceInstance.CurrentStreak).toEqual('0 Wins');
        });

        it('Should return "1 Win" from _getCurrentStreak, when called with 0 Wins and true', function(){

            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };
            var result = gameServiceInstance._.getCurrentStreak(true, streakData);

            expect(result).toEqual('1 Win');
        });

        it('Should return "2 Wins" from _getCurrentStreak, when called with 0 Wins and true twice', function(){

            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };

            gameServiceInstance._.getCurrentStreak(true, streakData);
            var result = gameServiceInstance._.getCurrentStreak(true, streakData);

            expect(result).toEqual('2 Wins');
        });

        it('Should return "20 Wins" from _getCurrentStreak, when called with 0 Wins and true twenty times', function(){

            var result = null;
            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };

            for(var i=0;i<20;i++){
                result = gameServiceInstance._.getCurrentStreak(true, streakData);
            }

            expect(result).toEqual('20 Wins');
        });

        it('Should return "1 Loss" from _getCurrentStreak, when called with 0 Wins and false', function(){

            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };

            var result = gameServiceInstance._.getCurrentStreak(false, streakData);

            expect(result).toEqual('1 Loss');
        });


        it('Should return "2 Losses" from _getCurrentStreak, when called with 0 Wins and false twice', function(){

            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };

            gameServiceInstance._.getCurrentStreak(false, streakData);
            var result = gameServiceInstance._.getCurrentStreak(false, streakData);

            expect(result).toEqual('2 Losses');
        });


        it('Should return "1 Loss" from _getCurrentStreak, when called with 0 Wins and 5 trues followed by 1 false', function(){

            var streakData = { Count: 0, Text: 'Wins', LastGameWon: false };

            var result;
            for(var i=0;i<5;i++){
                result = gameServiceInstance._.getCurrentStreak(true, streakData);
            }

            expect(result).toEqual('5 Wins');

            result = gameServiceInstance._.getCurrentStreak(false, streakData);

            expect(result).toEqual('1 Loss');
        });


        it('Should return true when scoregame is called with a color with the highest color count', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 6;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Simple, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 1000);
        });

        it('Should return score 5000 when scoregame is called with a color with the highest color count Simple Mode and 5 seconds', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Simple, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 1000);


        });

        it('Should return score 7500 when scoregame is called with a color with the highest color count Medium Mode and 5 seconds', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Medium, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 1500);


        });


        it('Should return score 12500 when scoregame is called with a color with the highest color count Hard Mode and 5 seconds', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Hard, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 2500);


        });


        it('Should return score 25000 when scoregame is called with a color with the highest color count VeryHard Mode and 5 seconds', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.VeryHard, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 5000);


        });


        it('Should return true when scoregame is called with a color with a tying high color count', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 10;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 6;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Simple, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(seconds * 1000);
        });


        it('Should return false and 0s score when scoregame is called with a color with a lower than highest color count', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 6;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 6;
            retryCount = 0;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Simple, seconds, retryCount);

            expect(result.gameWon).toBeFalsy();
            expect(result.score).toBe(0);
        });


        it('Should return score 12500/3 when scoregame is called with a color with the highest color count Hard Mode and 5 seconds and retry 2', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 2;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Hard, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(Math.round((seconds * 2500)/3));


        });

        it('Should return score 12500/9 when scoregame is called with a color with the highest color count Hard Mode and 5 seconds and retry 8', function(){

            var color1, color2, color3, colorCounts, chosenSquare, seconds, retryCount, result;

            color1 = colorServiceInstance.GetRandomColor();
            color2 = colorServiceInstance.GetRandomColor();
            color3 = colorServiceInstance.GetRandomColor();

            colorCounts = {};
            colorCounts[color1.GetColorId()] = 10;
            colorCounts[color2.GetColorId()] = 12;
            colorCounts[color3.GetColorId()] = 8;

            chosenSquare = squareServiceInstance.GetSquare(10, color2);

            seconds = 5;
            retryCount = 8;

            result = gameServiceInstance._.scoreGame(chosenSquare, colorCounts, gameServiceInstance.GameModes.Hard, seconds, retryCount);

            expect(result.gameWon).toBeTruthy();
            expect(result.score).toBe(Math.round((seconds * 2500)/9));


        });


        it('Should reset the colorCounts when a new game is started', function(){

            var length, lastColorCounts, squares;

            length =  getObjLength(gameServiceInstance._.colorCounts);

            expect(length).toBe(0);

            gameServiceInstance.SetGameMode(gameServiceInstance.GameModes.simple);
            squares = gameServiceInstance.StartGame();
            lastColorCounts = gameServiceInstance._.colorCounts;
            length = getObjLength(lastColorCounts);
            expect(length).toBe(4);
            expect(getColorCountsTotal(lastColorCounts)).toBe(64);
            gameServiceInstance.EndGame(squares[0][0]);
            gameServiceInstance.StartGame();
            length = getObjLength(gameServiceInstance._.colorCounts);
            expect(length).toBe(4);
            expect(gameServiceInstance._.colorCounts).not.toEqual(lastColorCounts);
            expect(getColorCountsTotal(gameServiceInstance._.colorCounts)).toBe(64);

        })

    });


    var getObjLength = function(obj) {
        var length = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                length++;
            }
        }
        return length;
    };

    var getColorCountsTotal = function(colorCounts) {
        var total = 0, key;
        for (key in colorCounts) {
            if (colorCounts.hasOwnProperty(key)) {
                total+= colorCounts[key];
            }
        }
        return total;
    };
}());
