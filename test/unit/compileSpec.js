'use strict';

/* jasmine specs for compilation go here */

describe('Compilation - Example of Required', function() {
  var myApp;
  var $scope;
  var $rootScope;
  var $compile;
  var $timeout;
  var element;

  beforeEach(module('validation.directive'));
  beforeEach(module('validation.rule'));

  beforeEach(function() {
    myApp = angular.module('myApp', ['validation', 'validation.rule'])
      .config(function($validationProvider) {
        $validationProvider.setSuccessHTML(function(msg) {
          // given the example of using filter
          return '<p class="validation-valid">{{"' + msg + '"| lowercase}}</p>';
        });
      });

    return myApp;
  });

  beforeEach(module('myApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $scope = $rootScope.$new();

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
    $scope.$digest();
  }));

  it('It should be lowercase', function() {
    $scope.Form.required.$setViewValue('Required');
    var messageElem = angular.element(element[0].querySelector('p'));
    // console.log(messageElem[0].indexOf('it\'s required'));
    expect(messageElem.html()).toEqual('it\'s required');
  });

});
