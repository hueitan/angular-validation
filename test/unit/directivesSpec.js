'use strict';

/* jasmine specs for services go here */

describe('provider', function () {
    beforeEach(module('validation.provider'));


    describe('expression', function () {
        it('shoud be define', inject(function (validationProvider) {
            expect(validationProvider.expression).toBeDefined();
        }));

        it('shoud be object', inject(function (validationProvider) {
            expect(validationProvider.expression).toEqual(jasmine.any(Object));
        }));
    });

    describe('defaultMsg', function () {
        it('shoud be define', inject(function (validationProvider) {
            expect(validationProvider.defaultMsg).toBeDefined();
        }));

        it('shoud be object', inject(function (validationProvider) {
            expect(validationProvider.defaultMsg).toEqual(jasmine.any(Object));
        }));
    });
});