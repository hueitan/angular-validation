'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {

    var $rootScope,
        $compile,
        $scope,
        element,
        validationProvider,
        myApp;

    beforeEach(function () {
        myApp = angular.module('myApp', ['validation'])
            .config(function ($validationProvider) {
                validationProvider = $validationProvider;
            });

        return myApp;
    });

    beforeEach(module('myApp'));

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();

        element = $compile('<form name="Form"><input type="text" ng-model="required" validator="required"></span></form>')($scope);
    }));

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

    it('set/get successHTML', inject(function () {
        validationProvider.setSuccessHTML(function (msg) {
            return '<p class="success">' + msg + '</p>';
        });

        expect(validationProvider.getSuccessHTML('true')).toEqual('<p class="success">true</p>');
    }));

    it('set/get errorHTML', inject(function () {
        validationProvider.setErrorHTML(function (msg) {
            return '<p class="error">' + msg + '</p>';
        });

        expect(validationProvider.getErrorHTML('error')).toEqual('<p class="error">error</p>');
    }));

    it('checkValid', inject(function () {
        expect(validationProvider.checkValid($scope.Form)).toBe(false);
        $scope.$apply(function () {
            $scope.required = 'required';
        });
        expect(validationProvider.checkValid($scope.Form)).toBe(true);
        $scope.$apply(function () {
            $scope.required = '';
        });
        expect(validationProvider.checkValid($scope.Form)).toBe(false);
    }));
});