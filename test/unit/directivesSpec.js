'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {

    var $scope,
        $rootScope,
        $compile,
        element;

    beforeEach(module('validation.directive'));

    describe('Example of Required', function () {

        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
            $scope = $rootScope.$new();

            element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></span></form>')($scope);
        }));

        it('Initial should be pristine and invalid', function () {
            expect($scope.Form.$pristine).toBe(true);
            expect(element.hasClass('ng-pristine')).toBe(true);
            expect($scope.Form.$invalid).toBe(true);
        });

        it('After Input should be dirty, valid, has class "validation-valid"', function () {

            $scope.$apply(function () {
                $scope.required = 'Required';
            });

            expect($scope.Form.$dirty).toBe(true);
            expect(element.hasClass('ng-dirty')).toBe(true);
            expect($scope.Form.$valid).toBe(true);
            expect(element.hasClass('ng-valid')).toBe(true);
            expect(element.find('p').hasClass('validation-valid')).toBe(true);
        });

        it('Input null should be dirty and invalid (after Input), has class "validation-invalid', function () {

            $scope.$apply(function () {
                $scope.required = 'Required';
            });

            $scope.$apply(function () {
                $scope.required = '';
            });

            expect($scope.Form.$dirty).toBe(true);
            expect(element.hasClass('ng-dirty')).toBe(true);
            expect($scope.Form.$invalid).toBe(true);
            expect(element.hasClass('ng-invalid')).toBe(true);
            expect(element.find('p').hasClass('validation-invalid')).toBe(true);
        });

        it('no-validation-message', inject(function () {
            element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" no-validation-message="true"></span></form>')($scope);
            var display = element.find('span').css('display');
            expect(display).toBe('none');
        }))
    });
});