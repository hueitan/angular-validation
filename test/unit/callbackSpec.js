'use strict';

/* jasmine specs for callback go here */

describe('callback', function() {
  var $rootScope;
  var $compile;
  var $scope;
  var $timeout;
  var element;
  var validationProvider;
  var myApp;

  // spy
  var validSpy = null;
  var validAttrSpy = null;
  var invalidSpy = null;
  var invalidAttrSpy = null;
  var resetSpy = null;

  beforeEach(function() {
    myApp = angular.module('myApp', ['validation', 'validation.rule'])
      .config(function($validationProvider) {
        validationProvider = $validationProvider;

        validSpy = jasmine.createSpy('validSpy');
        validAttrSpy = jasmine.createSpy('validAttrSpy');
        invalidSpy = jasmine.createSpy('invalidSpy');
        invalidAttrSpy = jasmine.createSpy('invalidAttrSpy');
        resetSpy = jasmine.createSpy('resetSpy');

        validationProvider.validCallback = function() {
          validSpy();
        };
        validationProvider.invalidCallback = function() {
          invalidSpy();
        };
        validationProvider.resetCallback = function() {
          resetSpy();
        };
      });

    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    $scope.validCallback = function() {
      validAttrSpy();
    };
    $scope.invalidCallback = function() {
      invalidAttrSpy();
    };

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" valid-method="submit" valid-callback="validCallback()" invalid-callback="invalidCallback()"></form>')($scope);
    angular.element(document.body).append(element);
    $scope.$digest();
  }));

  it('successCallback', inject(function() {

    $scope.$apply(function() {
      $scope.required = 'required';
    });

    validationProvider.validate($scope.Form);

    $timeout.flush();

    expect(validSpy).toHaveBeenCalled();
    expect(validAttrSpy).toHaveBeenCalled();
    expect(invalidSpy).not.toHaveBeenCalled();
    expect(invalidAttrSpy).not.toHaveBeenCalled();
    expect(resetSpy).not.toHaveBeenCalled();
  }));

  it('errorCallback', inject(function() {

    $scope.$apply(function() {
      $scope.required = '';
    });

    validationProvider.validate($scope.Form);

    $timeout.flush();

    expect(validSpy).not.toHaveBeenCalled();
    expect(validAttrSpy).not.toHaveBeenCalled();
    expect(invalidSpy).toHaveBeenCalled();
    expect(invalidAttrSpy).toHaveBeenCalled();
    expect(resetSpy).not.toHaveBeenCalled();
  }));

  it('resetCallback', inject(function() {

    $scope.$apply(function() {
      $scope.required = 'required';
    });

    validationProvider.reset($scope.Form);

    $timeout.flush();

    expect(validSpy).not.toHaveBeenCalled();
    expect(invalidSpy).not.toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
  }));
});
