(function(w, angular){
    'use strict';

    angular.module('squares').factory('squareService', ['colorService', function(colorService){
        var squareServiceInstance;

        w.SquareModel = function SquareModel(side, color){

            if (!(color instanceof ColorModel)){
                throw new Error('Square color must be a valid color');
            }

            this.H = side;
            this.W = side;
            this.Color = color;

            return this;
        }

        if (Object.seal){
            Object.seal(SquareModel);
        }

        squareServiceInstance = {
            GetSquare : function(side, color){
                return new SquareModel(side, color);
            },

            GetRandomSquare: function(maxSide){
                var color, side, square;

                color =  colorService.GetRandomColor();
                side = 0;
                while(side < 1){
                    side = Math.round((Math.random()*maxSide));
                }
                square = squareServiceInstance.GetSquare(side, color);

                return square;

            }

        };

        return squareServiceInstance;
    }]);
}(window, angular));