'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {

    var $rootScope,
        $compile,
        $scope,
        $timeout,
        element,
        validationProvider,
        myApp;

    beforeEach(function () {
        myApp = angular.module('myApp', ['validation', 'validation.rule'])
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
        $timeout = $injector.get('$timeout');

        element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
    }));

    it('set/get Expression (RegExp or Function)', inject(function () {
        var model = {
            huei: /^huei$/
        };

        validationProvider.setExpression(model);
        expect(validationProvider.getExpression('huei')).toEqual(model.huei);

        model = {
            huei: function () {
                return true;
            }
        };

        validationProvider.setExpression(model);
        expect(validationProvider.getExpression('huei')).toBe(model.huei);
    }));

    it('set/get DefaultMsg (String)', inject(function () {
        var obj = {
            huei: {
                error: 'It\'s should be huei',
                success: 'It\'s huei'
            }
        };

        validationProvider.setDefaultMsg(obj);

        expect(validationProvider.getDefaultMsg('huei')).toEqual(obj.huei);
        for (var key in validationProvider.getDefaultMsg('huei')) {
            expect(key).toMatch(/^error$|^success$/);
            expect(validationProvider.getDefaultMsg('huei')[key]).toEqual(obj.huei[key]);
        }
    }));

    it('set/get successHTML', inject(function () {
        validationProvider.setSuccessHTML('sethtml');
        expect(validationProvider.getSuccessHTML('true')).not.toEqual('sethtml');
        expect(validationProvider.getSuccessHTML('true')).toEqual('<p class="validation-valid">true</p>');

        validationProvider.setSuccessHTML(function (msg) {
            return '<p class="success">' + msg + '</p>';
        });

        expect(validationProvider.getSuccessHTML('true')).toEqual('<p class="success">true</p>');


    }));

    it('set/get errorHTML', inject(function () {
        validationProvider.setErrorHTML('sethtml');
        expect(validationProvider.getErrorHTML('false')).not.toEqual('sethtml');
        expect(validationProvider.getErrorHTML('false')).toEqual('<p class="validation-invalid">false</p>');

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

    it('reset', inject(function () {
        var resetSpy = jasmine.createSpy('resetSpy');
        $scope.$on('requiredreset-' + $scope.Form.required.validationId, function () {
            resetSpy();
        });
        validationProvider.reset($scope.Form);
        expect(element.find('p')[0]).toBeUndefined();
        expect(resetSpy).toHaveBeenCalled();
    }));

    it('validate - submit', inject(function () {
        var submitSpy = jasmine.createSpy('submitSpy'),
            successSpy = jasmine.createSpy('successSpy'),
            errorSpy = jasmine.createSpy('errorSpy'),
            submitSpy2 = jasmine.createSpy('submitSpy2'),
            successSpy2 = jasmine.createSpy('successSpy2'),
            errorSpy2 = jasmine.createSpy('errorSpy2');

        // test .success()
        $scope.$on('requiredsubmit-' + $scope.Form.required.validationId, function () {
            submitSpy();
        });
        $scope.$apply(function () {
            $scope.required = 'Required';
        });
        validationProvider.validate($scope.Form)
            .success(function () {
                successSpy();
            })
            .error(function () {
                errorSpy();
            });

        $timeout.flush();
        expect(submitSpy).toHaveBeenCalled();
        expect(successSpy).toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        // test .error()
        $scope.$apply(function () {
            $scope.required = '';
        });

        $scope.$on('requiredsubmit-' + $scope.Form.required.validationId, function () {
            submitSpy2();
        });

        validationProvider.validate($scope.Form)
            .success(function () {
                successSpy2();
            })
            .error(function () {
                errorSpy2();
            });

        $timeout.flush();
        expect(submitSpy2).toHaveBeenCalled();
        expect(successSpy2).not.toHaveBeenCalled();
        expect(errorSpy2).toHaveBeenCalled();
    }));
});