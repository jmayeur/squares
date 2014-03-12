(function(){

    'use strict';

    function ColorModel(r, g, b, a /*optional*/) {
        a = a || 1;

        function validateRGB(v, name) {
            if (v > 255 || v < 0) {
                throw new Error('Param [' + name + '] must be be a value between 0 and 255');
            }
        }

        validateRGB(r, 'r');
        validateRGB(g, 'g');
        validateRGB(b, 'b');

        if (a > 1 || a < 0) {
            throw new Error('Param [a] must be between 0 and 1');
        }

        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
        this.GetHexColor = function () {
            var color = this.R + 256 * this.G + 65536 * this.B;
            return color.toString(16);
        };

        return this;
    }


    describe('Controller: MainCtrl', function () {

        var mockGameService, testSquares = [1,2,3,4];
        // load the controller's module
        beforeEach(function(){
            module('squares');

            mockGameService = {
                RestartGame: jasmine.createSpy('RestartGame() mock'),
                StartGame : jasmine.createSpy('StartGame() mock').andReturn(testSquares),
                GameStarted : false,
                SetGameMode : jasmine.createSpy('SetGameMode(mode) mock'),
                SelectedColor : null
            }

            // use the $provide service to replace ServiceB
            // with your mock
            module('squares', function($provide) {
                $provide.value('gameService', mockGameService);
            });


        });

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        }));

        it('should have an empty array of squares by default', function () {
            expect(scope.squareRows).toEqual([]);
        });

        it('should set firstGameStarted to false', function () {
            expect(scope.firstGameStarted).toBeFalsy();
        });

        it('should call gameService.RestartGame when retry is executed', function(){
            scope.retry();
            expect(mockGameService.RestartGame).toHaveBeenCalled();
        });

        it('should call gameService.StartGame when next is executed and return some squares', function(){
            scope.next();
            expect(mockGameService.StartGame).toHaveBeenCalled();
            expect(scope.squareRows).toBe(testSquares);
        });

        it('should set gameData to the gameService', function () {
            expect(scope.gameData).toBe(mockGameService);
        });

        it('should call gameService.StartGame when startGame is executed and set firstGameStarted to true', function(){
            expect(scope.firstGameStarted).toBeFalsy();
            scope.startGame();
            expect(mockGameService.StartGame).toHaveBeenCalled();
            expect(scope.squareRows).toBe(testSquares);
            expect(scope.firstGameStarted).toBeTruthy();
        });

        it('should call gameService.SetGameMode with the provide mode when setGameMode is executed', function () {
            var expectedMode = 'sdf';
            scope.setGameMode(expectedMode);
            expect(mockGameService.SetGameMode).toHaveBeenCalledWith(expectedMode);
        });


        it('should Not Call gameService.SetGameMode when setGameMode is executed and a game is started', function () {
            var expectedMode = 'sdf';
            mockGameService.GameStarted = true;
            scope.setGameMode(expectedMode);
            expect(mockGameService.SetGameMode).not.toHaveBeenCalled();
        });


        it('should return "0" when getOutline is called with a non-matching color', function(){

            mockGameService.SelectedColor = new ColorModel(1,2,3,1);
            var result = scope.getOutline(new ColorModel(4,5,6,1));
            expect(result).toBe('0');

        });

        it('should return "2px dashed #fff" when getOutline is called with matching dark color', function(){

            var color = new ColorModel(127,127,127,1);
            mockGameService.SelectedColor = color;
            var result = scope.getOutline(color);
            expect(result).toBe('2px dashed #fff');
        });

        it('should return "2px dashed #aaa" when getOutline is called with matching light color', function(){

            var color = new ColorModel(128,128,128,1);
            mockGameService.SelectedColor = color;
            var result = scope.getOutline(color);
            expect(result).toBe('2px dashed #aaa');
        });

    });

}());

