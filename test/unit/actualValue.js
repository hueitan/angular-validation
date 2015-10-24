'use strict';

/* jasmine specs for provider go here */

describe('provider', function() {
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
      });

    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    element = $compile('<form name="Form"><input type="number" name="numberWatch" ng-model="number" validator="number,maxlength=4" email-error-message="Error Number" email-success-message="Good Number"/></form>')($scope);
    angular.element(document.body).append(element);
    $scope.$digest();
  }));

  it('set value to 123', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    $scope.$apply(function() {
      $scope.number = 123;
    });

    $scope.$on('numberWatchsubmit-' + $scope.Form.numberWatch.validationId, function() {
      submitSpy();
    });

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

  it('set value to 1234567', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    $scope.$apply(function() {
      $scope.number = 1234567;
    });

    $scope.$on('numberWatchsubmit-' + $scope.Form.numberWatch.validationId, function() {
      submitSpy();
    });

    validationProvider.validate($scope.Form)
      .success(function() {
        successSpy();
      })
      .error(function() {
        errorSpy();
      });

    $timeout.flush();
    expect(submitSpy).toHaveBeenCalled();
    expect(successSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  }));

  it('set value to "ABC"', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    // expect error because we are using <input type="number"/> not type="text"
    try {
      $scope.$apply(function() {
        $scope.number = 'ABC';
      });
    } catch (e) {
      errorSpy();
    }

    $scope.$on('numberWatchsubmit-' + $scope.Form.numberWatch.validationId, function() {
      submitSpy();
    });

    expect(submitSpy).not.toHaveBeenCalled();
    expect(successSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  }));
});
