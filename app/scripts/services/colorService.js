(function (w, angular) {
    'use strict';

    angular.module('squares').factory('colorService', function () {
        var colorServiceInstance, generateRGB, simpleColors,
            mediumColors, hardColors, veryHardColors, lastRandomColor = null;

        w.ColorModel = function ColorModel(r, g, b) {

            function validateRGB(v, name) {
                if (v > 255 || v < 0) {
                    throw new Error('Param [' + name + '] must be be a value between 0 and 255');
                }
            }

            validateRGB(r, 'r');
            validateRGB(g, 'g');
            validateRGB(b, 'b');

            this.R = r;
            this.G = g;
            this.B = b;
            //always solid
            this.A = 1;

            this.GetHexColor = function () {
                var color = this.R + 256 * this.G + 65536 * this.B;
                return color.toString(16);
            };

            this.GetColorId = function(){
                return parseInt(this.GetHexColor(), 16);
            }

            return this;
        }

        if (Object.seal) {
            Object.seal(w.ColorModel);
        }

        generateRGB = function () {
            var random, value;
            random = Math.random();
            value = Math.round((random * 255));

            return value;
        };

        simpleColors = [
            new ColorModel(25, 25, 112),    //Midnight Blue
            new ColorModel(107, 147, 35),   //Olive Drab
            new ColorModel(0, 0, 0),        //Black
            new ColorModel(255, 0, 0),      //Red
        ];


        mediumColors = simpleColors.slice();
        mediumColors.push(new ColorModel(139, 125, 107)); //Bisque 4;
        mediumColors.push(new ColorModel(49, 79, 79)); //Dark Slate Gray
        mediumColors.push(new ColorModel(0, 0, 255)); //Blue
        mediumColors.push(new ColorModel(0, 100, 0)); //Dark Green


        hardColors = mediumColors.slice();
        hardColors.push(new ColorModel(255, 255, 0)); //Yellow
        hardColors.push(new ColorModel(255, 160, 122)); //Light Salmon
        hardColors.push(new ColorModel(160, 32, 240)); //Purple
        hardColors.push(new ColorModel(255, 240, 245)); //Lavender Blush


        veryHardColors = [];

        colorServiceInstance = {
            GetRandomColor: function () {
                var colorModel, r, g, b;
                r = generateRGB();
                g = generateRGB();
                b = generateRGB();

                colorModel = new ColorModel(r, g, b);
                if (lastRandomColor !== null && colorModel.GetColorId() === lastRandomColor.GetColorId()){
                    return colorServiceInstance.GetRandomColor();
                }
                lastRandomColor = colorModel;
                return colorModel;
            },

            SimpleColors: {
                GetColor: function (index) {
                    if (index < 0 || index > 3) {
                        throw new Error('Param [index] should be between 0 and 3 value:' + index);
                    }
                    return simpleColors[index];
                },
                Max: 3
            },

            MediumColors: {
                GetColor: function (index) {
                    if (index < 0 || index > 7) {
                        throw new Error('Param [index] should be between 0 and 7 value:' + index);
                    }
                    return mediumColors[index];
                },
                Max: 7
            },

            HardColors: {
                GetColor: function (index) {
                    if (index < 0 || index > 11) {
                        throw new Error('Param [index] should be between 0 and 11 value:' + index);
                    }
                    return hardColors[index];
                },
                Max: 11
            },

            VeryHardColors: {
                GetColor: function (index) {
                    if (index < 0 || index > 99) {
                        throw new Error('Param [index] should be between 0 and 99 value:' + index);
                    }
                    return veryHardColors[index];
                },
                Max: 99
            }
        };

        for (var i = 0; i < 100; i++) {
            veryHardColors.push(colorServiceInstance.GetRandomColor());
        }

        return colorServiceInstance;
    })
}(window, angular));