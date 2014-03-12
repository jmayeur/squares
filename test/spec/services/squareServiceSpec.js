(function(){
    'use strict';

    describe('Service: squareService', function () {

        var squareServiceInstance, colorServiceInstance;

        // load the controller's module
        beforeEach(function(){
            module('squares');
            inject(function(squareService, colorService){
                squareServiceInstance = squareService;
                colorServiceInstance = colorService;
            })

        });

        it('Should return a SquareModel instance', function(){

            var square =  squareServiceInstance.GetSquare(1, colorServiceInstance.GetRandomColor());
            expect(square instanceof SquareModel).toBeTruthy();
        });

        it('Should return a SquareModel with an H between 1 and 30', function(){

            var square =  squareServiceInstance.GetSquare(1, colorServiceInstance.GetRandomColor());
            expect(square.H >= 1 && square.H <=30).toBeTruthy();
        });

        it('Should return a SquareModel with an W between 1 and 30', function(){

            var square =  squareServiceInstance.GetSquare(1, colorServiceInstance.GetRandomColor());
            expect(square.W >= 1 && square.W <=30).toBeTruthy();
        });

    });
}());
