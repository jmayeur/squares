'use strict';

describe('Service: gameService', function () {

    var colorServiceInstance;

    // load the controller's module
    beforeEach(function(){
        module('squares');
        inject(function(colorService){
            colorServiceInstance = colorService;
        })

    });

    it('Should return a ColorModel instance', function(){

        var color =  colorServiceInstance.GetRandomColor();
        expect(color instanceof ColorModel).toBeTruthy();
    });

    it('Should have an R value between 0 and 255', function(){
        var color =  colorServiceInstance.GetRandomColor();
        expect(color.R <=255 && color.R >= 0).toBeTruthy()
    });

    it('Should have an G value between 0 and 255', function(){
        var color =  colorServiceInstance.GetRandomColor();
        expect(color.G <=255 && color.G >= 0).toBeTruthy()
    });

    it('Should have an B value between 0 and 255', function(){
        var color =  colorServiceInstance.GetRandomColor();
        expect(color.B <=255 && color.B >= 0).toBeTruthy()
    });

    it('Should have an A value between 0 and 1', function(){
        var color =  colorServiceInstance.GetRandomColor();
        expect(color.A <=1 && color.A >= 0).toBeTruthy()
    });

    it('Should difference R values for 2 different colors', function(){
        var color1 =  colorServiceInstance.GetRandomColor();
        var color2 =  colorServiceInstance.GetRandomColor();
        expect(color1.R !== color2.R).toBeTruthy()
    });

    it('Should difference G values for 2 different colors', function(){
        var color1 =  colorServiceInstance.GetRandomColor();
        var color2 =  colorServiceInstance.GetRandomColor();
        expect(color1.G !== color2.G).toBeTruthy()
    });

    it('Should difference B values for 2 different colors', function(){
        var color1 =  colorServiceInstance.GetRandomColor();
        var color2 =  colorServiceInstance.GetRandomColor();
        expect(color1.B !== color2.B).toBeTruthy()
    });


    it('Should return the same color when I call GetSimpleColor with the same index 1', function(){

        var color1 = colorServiceInstance.SimpleColors.GetColor(1);
        var color2 = colorServiceInstance.SimpleColors.GetColor(1);
        expect(color1).toEqual(color2);
    });

    it('Should return a different color when I call GetSimpleColor with the index 1 and 2', function(){

        var color1 = colorServiceInstance.SimpleColors.GetColor(1);
        var color2 = colorServiceInstance.SimpleColors.GetColor(2);
        expect(color1).toNotEqual(color2);
    });

    it('Should return a Max of 3 for SimpleColors.Max', function(){
        expect(colorServiceInstance.SimpleColors.Max).toEqual(3);
    });

    it('Should return a Different color for each SimpleColors.', function(){

        var colors =[];
        for(var i=0;i<=colorServiceInstance.SimpleColors.Max;i++){
            colors.push(colorServiceInstance.SimpleColors.GetColor(i));
        }

        for(i=0;i<=colorServiceInstance.SimpleColors.Max;i++){
            var compColor =colors[i];
            for(var j=0;j<colorServiceInstance.SimpleColors.Max;j++){
                if (j === i){
                    continue;
                }
                expect(compColor.GetColorId()).not.toEqual(colors[j].GetColorId());
            }
        }
    });

    it('Should return a Max of 7 for MediumColors.Max', function(){
        expect(colorServiceInstance.MediumColors.Max).toEqual(7);
    });

    it('Should return a Different color for each MediumColors.', function(){

        var colors =[];
        for(var i=0;i<=colorServiceInstance.MediumColors.Max;i++){
            colors.push(colorServiceInstance.MediumColors.GetColor(i));
        }

        for(i=0;i<=colorServiceInstance.MediumColors.Max;i++){
            var compColor =colors[i];
            for(var j=0;j<colorServiceInstance.MediumColors.Max;j++){
                if (j === i){
                    continue;
                }
                expect(compColor.GetColorId()).not.toEqual(colors[j].GetColorId());
            }
        }
    });

    it('Should return a Max of 11 for HardColors.Max', function(){
        expect(colorServiceInstance.HardColors.Max).toEqual(11);
    });

    it('Should return a Different color for each HardColors.', function(){

        var colors =[];
        for(var i=0;i<=colorServiceInstance.HardColors.Max;i++){
            colors.push(colorServiceInstance.HardColors.GetColor(i));
        }

        for(i=0;i<=colorServiceInstance.HardColors.Max;i++){
            var compColor =colors[i];
            for(var j=0;j<colorServiceInstance.HardColors.Max;j++){
                if (j === i){
                    continue;
                }
                expect(compColor.GetColorId()).not.toEqual(colors[j].GetColorId());
            }
        }
    });

    it('Should return a Max of 11 for VeryHardColors.Max', function(){
        expect(colorServiceInstance.VeryHardColors.Max).toEqual(99);
    });

    it('Should return a Different color for each VeryHardColors.', function(){

        var colors =[];
        for(var i=0;i<=colorServiceInstance.VeryHardColors.Max;i++){
            colors.push(colorServiceInstance.VeryHardColors.GetColor(i));
        }

        for(i=0;i<=colorServiceInstance.VeryHardColors.Max;i++){
            var compColor =colors[i];
            for(var j=0;j<colorServiceInstance.VeryHardColors.Max;j++){
                if (j === i){
                    continue;
                }
                expect(compColor.GetColorId()).not.toEqual(colors[j].GetColorId());
            }
        }
    });
});