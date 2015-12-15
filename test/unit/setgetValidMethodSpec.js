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

    // set validMethod submit
    validationProvider.setValidMethod('submit');

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);


  }));


  it('set validMethod submit', inject(function() {

    $scope.$apply(function() {
      $scope.required = 'required';
    });

    expect(element.find('p')[0]).toBeUndefined();

    validationProvider.validate($scope.Form);

    // this is important step
    $timeout.flush();

    expect(element.find('p')[0]).toBeDefined();
  }));
});
