'use strict';

/* jasmine specs for provider go here */

describe('provider.showSuccessMessage=false', function() {
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
        validationProvider.showSuccessMessage = false;
      });
    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
  }));

  it('showSuccessMessage', inject(function() {
    $scope.Form.required.$setViewValue('Required');
    var display = element.find('span').css('display');
    expect(display).toBe('none');

    $scope.Form.required.$setViewValue('');
    display = element.find('span').css('display');
    expect(display).toBe('');
  }));

});

describe('provider.showErrorMessage=false', function() {
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
        validationProvider.showErrorMessage = false;
      });
    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
  }));

  it('showErrorMessage', inject(function() {
    $scope.Form.required.$setViewValue('Required');
    var display = element.find('span').css('display');
    expect(display).toBe('');

    $scope.Form.required.$setViewValue('');
    display = element.find('span').css('display');
    expect(display).toBe('none');
  }));

});

// no-validation-message should has higher priority than showErrorMessage/showSuccessMessage
describe('provider.showErrorMessage=false with no-validation-message', function() {
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
        validationProvider.showErrorMessage = true;
        validationProvider.showSuccessMessage = true;
      });
    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" no-validation-message="true"></form>')($scope);
  }));

  it('showErrorMessage', inject(function() {
    $scope.Form.required.$setViewValue('Required');
    var display = element.find('span').css('display');
    expect(display).toBe('none');

    $scope.Form.required.$setViewValue('');
    display = element.find('span').css('display');
    expect(display).toBe('none');
  }));

});
