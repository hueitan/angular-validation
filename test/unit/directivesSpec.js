'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {
    beforeEach(module('validation.provider'));


    describe('expression', function () {
        it('shoud be define, object, every key should be RegExp', inject(function (validationProvider) {
            expect(validationProvider.expression).toBeDefined();
            expect(validationProvider.expression).toEqual(jasmine.any(Object));
            for (var key in validationProvider.expression) {
                expect(validationProvider.expression[key]).toEqual(jasmine.any(RegExp));
            }
        }));
    });

    describe('setup Expression', function () {
        it('After setup, it should still be expression(Regex)', inject(function (validationProvider) {
            validationProvider.setupExpression({ huei: /^huei$/ });

            expect(validationProvider.expression).toBeDefined();
            expect(validationProvider.expression).toEqual(jasmine.any(Object));
            for (var key in validationProvider.expression) {
                expect(validationProvider.expression[key]).toEqual(jasmine.any(RegExp));
            }
        }));
    });

    describe('defaultMsg', function () {
        it('shoud be define, object, every key should be object', inject(function (validationProvider) {
            expect(validationProvider.defaultMsg).toBeDefined();
            expect(validationProvider.defaultMsg).toEqual(jasmine.any(Object));
            for (var key in validationProvider.defaultMsg) {
                expect(validationProvider.defaultMsg[key]).toEqual(jasmine.any(Object));
            }
        }));
    });

    describe('setup defaultMsg', function () {
        it('After setup, it should still be Msg', inject(function (validationProvider) {
            var obj = {
                huei: {
                    error: 'It\'s should be huei',
                    success: 'It\'s huei'
                }
            };

            validationProvider.setupExpression(obj);

            expect(validationProvider.defaultMsg).toBeDefined();
            expect(validationProvider.defaultMsg).toEqual(jasmine.any(Object));
            for (var key in validationProvider.defaultMsg) {
                expect(validationProvider.defaultMsg[key]).toEqual(jasmine.any(Object));
            }
        }));
    });
});