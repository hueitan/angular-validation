'use strict';

/* jasmine specs for validationReset go here */

describe('validation-reset SPEC', function() {
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

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"><button validation-reset="Form">Button</button></form>')($scope);
    $scope.$digest();
  }));

  it('Form should be reset', function() {
    $scope.Form.required.$setViewValue('Required');
    var messageElem = angular.element(element[0].querySelector('button'));

    $timeout(function() {
      angular.element(messageElem).triggerHandler('click');
    }, 0);
    // I'm not sure why we need flush again
    $timeout.flush();

    expect(angular.element(element[0].querySelector('span')).html()).toEqual('');
  });

});
