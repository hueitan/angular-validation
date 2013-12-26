'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {

    var validationProvider;

    beforeEach(function () {
        return angular.module('myApp', ['validation'])
            .config(function ($validationProvider) {
                validationProvider = $validationProvider;
            })
    });
    beforeEach(module('myApp'));

    it('set/get Expression (RegExp or Function)', inject(function () {
        validationProvider.setExpression({ huei: /^huei$/ });
        expect(validationProvider.getExpression('huei')).toEqual(jasmine.any(RegExp));
        validationProvider.setExpression({ huei: function () {
            return true;
        }});
        expect(validationProvider.getExpression('huei')).toEqual(jasmine.any(Function));
    }));

    it('set/get DefaultMsg (String)', inject(function () {
        var obj = {
            huei: {
                error: 'It\'s should be huei',
                success: 'It\'s huei'
            }
        };

        validationProvider.setDefaultMsg(obj);

        expect(validationProvider.getDefaultMsg('huei')).toEqual(jasmine.any(Object));
        for (var key in validationProvider.getDefaultMsg('huei')) {
            expect(key).toMatch(/^error$|^success$/);
            expect(validationProvider.getDefaultMsg('huei')[key]).toEqual(jasmine.any(String));
        }
    }));

});