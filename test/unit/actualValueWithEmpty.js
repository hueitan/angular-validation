'use strict';

/* jasmine specs for provider go here */

describe('provider with empty values allowed', function() {
  var $rootScope;
  var $compile;
  var $scope;
  var $timeout;
  var element;
  var validationProvider;
  var myApp;

  beforeEach(function() {
    myApp = angular.module('myApp', ['validation', 'validation.rule'])
      .config(function($validationProvider) {
        validationProvider = $validationProvider;
        // Allow empty values
        $validationProvider.allowEmptyValues = true;
      });

    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    element = $compile('<form name="Form"><input type="number" name="numberWatch" ng-model="number" validator="number" email-error-message="Error Number" email-success-message="Good Number"/></form>')($scope);
    angular.element(document.body).append(element);
    $scope.$digest();
  }));

  it('set value to undefined', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    $scope.$apply(function() {
      $scope.number = undefined;
    });

    $scope.$on('numberWatchsubmit-' + $scope.Form.numberWatch.validationId, function() {
      submitSpy();
    });

    // expect success as a vacuous truth (value is undefined and should therefore pass both number and maxlength tests)
    validationProvider.validate($scope.Form)
      .success(function() {
        successSpy();
      })
      .error(function() {
        errorSpy();
      });

    $timeout.flush();
    expect(submitSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  }));

  it('set value to empty', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    $scope.$apply(function() {
      $scope.number = '';
    });

    $scope.$on('numberWatchsubmit-' + $scope.Form.numberWatch.validationId, function() {
      submitSpy();
    });

    // expect success as a vacuous truth (value is empty and should therefore pass both number and maxlength tests)
    validationProvider.validate($scope.Form)
      .success(function() {
        successSpy();
      })
      .error(function() {
        errorSpy();
      });

    $timeout.flush();
    expect(submitSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  }));
});
