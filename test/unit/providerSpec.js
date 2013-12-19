'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {
    beforeEach(module('validation.provider'));


    describe('expression', function () {
        it('shoud be define, object, every key should be RegExp', inject(function ($validation) {
            expect($validation.expression).toBeDefined();
            expect($validation.expression).toEqual(jasmine.any(Object));
            for (var key in $validation.expression) {
                expect($validation.expression[key]).toEqual(jasmine.any(RegExp));
            }
        }));
    });

    describe('setup Expression', function () {
        it('After setup, it should still be expression(Regex)', inject(function ($validation) {
            $validation.setupExpression({ huei: /^huei$/ });

            expect($validation.expression).toBeDefined();
            expect($validation.expression).toEqual(jasmine.any(Object));
            for (var key in $validation.expression) {
                expect($validation.expression[key]).toEqual(jasmine.any(RegExp));
            }
        }));
    });

    describe('defaultMsg', function () {
        it('shoud be define, object, every key should be object', inject(function ($validation) {
            expect($validation.defaultMsg).toBeDefined();
            expect($validation.defaultMsg).toEqual(jasmine.any(Object));
            for (var key in $validation.defaultMsg) {
                expect($validation.defaultMsg[key]).toEqual(jasmine.any(Object));
            }
        }));
    });

    describe('setup defaultMsg', function () {
        it('After setup, it should still be Msg', inject(function ($validation) {
            var obj = {
                huei: {
                    error: 'It\'s should be huei',
                    success: 'It\'s huei'
                }
            };

            $validation.setupExpression(obj);

            expect($validation.defaultMsg).toBeDefined();
            expect($validation.defaultMsg).toEqual(jasmine.any(Object));
            for (var key in $validation.defaultMsg) {
                expect($validation.defaultMsg[key]).toEqual(jasmine.any(Object));
            }
        }));
    });

    describe('checkValid', function () {
       it('It should be Valid when start', inject(function ($validation){
           expect($validation.checkValid()).toBe(true);
       }));
    });
});