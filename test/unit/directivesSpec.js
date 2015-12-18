'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  var $scope;
  var $rootScope;
  var $compile;
  var $timeout;
  var element;

  beforeEach(module('validation.directive'));
  beforeEach(module('validation.rule'));

  describe('Example of Required', function() {
    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
      $scope.$digest();
    }));

    it('Initial should be pristine and invalid', function() {
      expect($scope.Form.$pristine).toBe(true);
      expect(element.hasClass('ng-pristine')).toBe(true);
      expect($scope.Form.$valid).toBeUndefined(true);
      expect($scope.Form.$invalid).toBeUndefined(true);
    });

    it('After Input should be dirty, valid, has class "validation-valid"', function() {
      $scope.Form.required.$setViewValue('Required');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);
      expect(element.find('p').hasClass('validation-valid')).toBe(true);
    });

    it('Input null should be dirty and invalid (after Input), has class "validation-invalid', function() {
      $scope.Form.required.$setViewValue('Required');
      $scope.Form.required.$setViewValue('');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$invalid).toBe(true);
      expect(element.hasClass('ng-invalid')).toBe(true);
      expect(element.find('p').hasClass('validation-invalid')).toBe(true);
    });

    it('no-validation-message', inject(function() {
      var display;
      // given no-validation-message="true"
      element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" no-validation-message="true"></form>')($scope);
      $timeout.flush();
      display = element.find('span').css('display');
      expect(display).toBe('none');

      // given no-validation-message="false"
      element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" no-validation-message="false"></form>')($scope);
      $timeout.flush();
      display = element.find('span').css('display');
      expect(display).toBe('block');

      // given no-validation-message="{{ noValidMessage }}" -> 'true'
      element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" no-validation-message="{{ noValidMessage }}"></form>')($scope);
      $timeout.flush();
      $scope.$apply(function() {
        $scope.noValidMessage = 'true';
      });
      display = element.find('span').css('display');
      expect(display).toBe('none');

      // given no-validation-message="{{ noValidMessage }}" -> true
      $scope.$apply(function() {
        $scope.noValidMessage = true;
      });
      display = element.find('span').css('display');
      expect(display).toBe('none');

      // given no-validation-message="{{ noValidMessage }}" -> 'false'
      $scope.$apply(function() {
        $scope.noValidMessage = 'false';
      });
      display = element.find('span').css('display');
      expect(display).toBe('block');

      // given no-validation-message="{{ noValidMessage }}" -> false
      $scope.$apply(function() {
        $scope.noValidMessage = false;
      });
      display = element.find('span').css('display');
      expect(display).toBe('block');
    }));
  });

  describe('Message-id attribute', function() {
    var messageElem;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required" message-id="message"><span id="message"></span></form>')($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
    }));

    afterEach(function() {
      element.remove();
      element = null;
    });

    it('should be pristine and invalid', function() {
      expect($scope.Form.$pristine).toBe(true);
      expect(element.hasClass('ng-pristine')).toBe(true);
      expect($scope.Form.$valid).toBeUndefined(true);
      expect($scope.Form.$invalid).toBeUndefined(true);
    });

    it('should be dirty and valid', function() {
      $scope.Form.required.$setViewValue('Required');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);
    });

    it('should be dirty and invalid', function() {
      $scope.Form.required.$setViewValue('Required');
      $scope.Form.required.$setViewValue('');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$invalid).toBe(true);
      expect(element.hasClass('ng-invalid')).toBe(true);
    });

    it('should have a success message inside the #message element', function() {
      $scope.Form.required.$setViewValue('Required');

      messageElem = angular.element(element[0].querySelector('#message > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #message element', function() {
      $scope.Form.required.$setViewValue('Required');
      $scope.Form.required.$setViewValue('');

      messageElem = angular.element(element[0].querySelector('#message > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });
  });

  describe('Validation-group attribute for checkbox elements', function() {
    var messageElem;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="checkbox" name="checkbox1" ng-model="checkbox1" validator="required" validation-group="checkbox"><input type="checkbox" name="checkbox2" ng-model="checkbox2" validator="required" validation-group="checkbox"><span id="checkbox"></span></form>')($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
    }));

    afterEach(function() {
      element.remove();
      element = null;
    });

    it('should be pristine', function() {
      expect($scope.Form.$pristine).toBe(true);
      expect(element.hasClass('ng-pristine')).toBe(true);
      expect($scope.Form.$valid).toBeUndefined(true);
      expect($scope.Form.$invalid).toBeUndefined(true);
    });

    it('should be dirty and valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);
    });

    it('should be dirty and invalid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);
      $scope.Form.checkbox2.$setViewValue(false);

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$invalid).toBe(true);
      expect(element.hasClass('ng-invalid')).toBe(true);
    });

    it('should have a success message inside the #checkbox element when an element is valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);

      messageElem = angular.element(element[0].querySelector('#checkbox > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #checkbox element when no element is valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);

      messageElem = angular.element(element[0].querySelector('#checkbox > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });

    it('should have a success message inside the #checkbox element when both elements are valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);

      messageElem = angular.element(element[0].querySelector('#checkbox > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have a success message inside the #checkbox element when one of element is valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);

      messageElem = angular.element(element[0].querySelector('#checkbox > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #checkbox element when both of elements are invalid', function() {
      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);
      $scope.Form.checkbox2.$setViewValue(false);

      messageElem = angular.element(element[0].querySelector('#checkbox > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });
  });

  describe('Validation-group attribute for any elements', function() {
    var messageElem;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="text" name="email" ng-model="email" validator="required" validation-group="contact"><input type="number" name="telephone" ng-model="telephone" validator="number" validation-group="contact"><span id="contact"></span></form>')($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
    }));

    afterEach(function() {
      element.remove();
      element = null;
    });

    it('should be pristine', function() {
      expect($scope.Form.$pristine).toBe(true);
      expect(element.hasClass('ng-pristine')).toBe(true);
      expect($scope.Form.$valid).toBeUndefined(true);
      expect($scope.Form.$invalid).toBeUndefined(true);
    });

    it('should be dirty and valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);
    });

    it('should be dirty and invalid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');
      $scope.Form.email.$setViewValue();
      $scope.Form.telephone.$setViewValue();

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$invalid).toBe(true);
      expect(element.hasClass('ng-invalid')).toBe(true);
    });

    it('should have a success message inside the #contact element when an element is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #contact element when no element is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.email.$setViewValue();

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });

    it('should have a success message inside the #contact element when both elements are valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have a success message inside the #contact element when one of element is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');
      $scope.Form.email.$setViewValue();

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #contact element when both of elements are invalid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');
      $scope.Form.email.$setViewValue();
      $scope.Form.telephone.$setViewValue();

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });
  });
});
