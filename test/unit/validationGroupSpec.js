'use strict';

describe('validation-group directive', function() {
  var $scope;
  var $rootScope;
  var $compile;
  var $timeout;
  var validationProvider;
  var element;

  beforeEach(module('validation.directive'));
  beforeEach(module('validation.rule'));

  describe('validation-group attribute for checkbox elements', function() {
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

    it('should be valid when at least one of elements is valid', function() {
      $scope.Form.checkbox1.$setViewValue(true);

      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);

      $scope.Form.checkbox1.$setViewValue(false);
      expect($scope.Form.$valid).toBe(false);
      expect(element.hasClass('ng-invalid')).toBe(true);

      $scope.Form.checkbox2.$setViewValue(true);
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);
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

  describe('validation-group attribute for any elements', function() {
    var messageElem;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="text" name="email" ng-model="email" validator="email" validation-group="contact"><input type="text" name="telephone" ng-model="telephone" validator="number" validation-group="contact"><span id="contact"></span></form>')($scope);
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
      $scope.Form.email.$setViewValue('');
      $scope.Form.telephone.$setViewValue('');

      expect($scope.Form.$dirty).toBe(true);
      expect(element.hasClass('ng-dirty')).toBe(true);
      expect($scope.Form.$invalid).toBe(true);
      expect(element.hasClass('ng-invalid')).toBe(true);
    });

    it('should be valid when at least one of elements is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);

      $scope.Form.telephone.$setViewValue('065839481');
      $scope.Form.email.$setViewValue('');
      expect($scope.Form.$valid).toBe(true);
      expect(element.hasClass('ng-valid')).toBe(true);

      $scope.Form.telephone.$setViewValue('');
      expect($scope.Form.$valid).toBe(false);
      expect(element.hasClass('ng-invalid')).toBe(true);
    });


    it('should have a success message inside the #contact element when an element is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #contact element when no element is valid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.email.$setViewValue('');

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
      $scope.Form.email.$setViewValue('');

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-valid')).toBe(true);
    });

    it('should have an error message inside the #contact element when both of elements are invalid', function() {
      $scope.Form.email.$setViewValue('foo@bar.com');
      $scope.Form.telephone.$setViewValue('065839481');
      $scope.Form.email.$setViewValue('');
      $scope.Form.telephone.$setViewValue('');

      messageElem = angular.element(element[0].querySelector('#contact > p'));
      expect(messageElem.hasClass('validation-invalid')).toBe(true);
    });
  });

  describe('validation-group attribute validated by using the provider', function() {
    var successSpy;
    var errorSpy;
    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      validationProvider = $injector.get('$validation');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      element = $compile('<form name="Form"><input type="checkbox" name="checkbox1" ng-model="checkbox1" validator="required" validation-group="checkbox"><input type="checkbox" name="checkbox2" ng-model="checkbox2" validator="required" validation-group="checkbox"><span id="checkbox"></span></form>')($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
    }));

    afterEach(function() {
      element.remove();
      element = null;
    });

    it('should validate a form and call a success callback', function() {
      successSpy = jasmine.createSpy('successSpy');
      errorSpy = jasmine.createSpy('errorSpy');

      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);

      validationProvider.validate($scope.Form)
        .success(function() {
          successSpy();
        })
        .error(function() {
          errorSpy();
        });
      $timeout.flush();
      expect(successSpy).toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('should validate a form and call a success callback when at least one of elements in the form is valid', function() {
      successSpy = jasmine.createSpy('successSpy');
      errorSpy = jasmine.createSpy('errorSpy');

      $scope.Form.checkbox1.$setViewValue(true);

      validationProvider.validate($scope.Form)
        .success(function() {
          successSpy();
        })
        .error(function() {
          errorSpy();
        });
      $timeout.flush();
      expect(successSpy).toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('should validate a form and call an error callback when all elements are invalid', function() {
      successSpy = jasmine.createSpy('successSpy');
      errorSpy = jasmine.createSpy('errorSpy');

      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox2.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);
      $scope.Form.checkbox2.$setViewValue(false);

      validationProvider.validate($scope.Form)
        .success(function() {
          successSpy();
        })
        .error(function() {
          errorSpy();
        });
      $timeout.flush();
      expect(successSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalled();
    });

    it('should validate a form element and call a success callback', function() {
      successSpy = jasmine.createSpy('successSpy');
      errorSpy = jasmine.createSpy('errorSpy');

      $scope.Form.checkbox1.$setViewValue(true);

      validationProvider.validate($scope.Form.checkbox1)
        .success(function() {
          successSpy();
        })
        .error(function() {
          errorSpy();
        });
      $timeout.flush();
      expect(successSpy).toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('should validate a form element and call an error callback', function() {
      successSpy = jasmine.createSpy('successSpy');
      errorSpy = jasmine.createSpy('errorSpy');

      $scope.Form.checkbox1.$setViewValue(true);
      $scope.Form.checkbox1.$setViewValue(false);

      validationProvider.validate($scope.Form)
        .success(function() {
          successSpy();
        })
        .error(function() {
          errorSpy();
        });
      $timeout.flush();
      expect(successSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
