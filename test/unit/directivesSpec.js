'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    beforeEach(module('validation.directive'));

    describe('Check Validation', function() {
        it('required as example', function() {
            inject(function($compile, $rootScope) {
                var scope = $rootScope.$new();
                var element = $compile('<input type="text" ng-model="required" validator="required"></span>')(scope);

                expect(element.hasClass('ng-pristine')).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(true);

                // Given input value
                scope.$apply(function () {
                    scope.required = 'Required';
                });

                expect(element.hasClass('ng-dirty')).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(false);
            });
        });
    });
});