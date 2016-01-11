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

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
  }));

  it('set/get Expression (RegExp or Function)', inject(function() {
    var model = {
      huei: /^huei$/
    };

    validationProvider.setExpression(model);
    expect(validationProvider.getExpression('huei')).toEqual(model.huei);

    model = {
      huei: function() {
        return true;
      }
    };

    validationProvider.setExpression(model);
    expect(validationProvider.getExpression('huei')).toBe(model.huei);
  }));

  it('set/get DefaultMsg (String)', inject(function() {
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

  it('set/get successHTML', inject(function() {
    validationProvider.setSuccessHTML('sethtml');
    expect(validationProvider.getSuccessHTML('true')).not.toEqual('sethtml');
    expect(validationProvider.getSuccessHTML('true')).toEqual('<p class="validation-valid">true</p>');

    validationProvider.setSuccessHTML(function(msg) {
      return '<p class="success">' + msg + '</p>';
    });

    expect(validationProvider.getSuccessHTML('true')).toEqual('<p class="success">true</p>');
  }));

  it('set/get errorHTML', inject(function() {
    validationProvider.setErrorHTML('sethtml');
    expect(validationProvider.getErrorHTML('false')).not.toEqual('sethtml');
    expect(validationProvider.getErrorHTML('false')).toEqual('<p class="validation-invalid">false</p>');

    validationProvider.setErrorHTML(function(msg) {
      return '<p class="error">' + msg + '</p>';
    });

    expect(validationProvider.getErrorHTML('error')).toEqual('<p class="error">error</p>');
  }));

  it('checkValid', inject(function() {
    expect(validationProvider.checkValid($scope.Form)).toBe(false);
    $scope.Form.required.$setViewValue('required');
    expect(validationProvider.checkValid($scope.Form)).toBe(true);
    $scope.Form.required.$setViewValue('');
    expect(validationProvider.checkValid($scope.Form)).toBe(false);
    delete $scope.Form;
    expect(validationProvider.checkValid($scope.Form)).toBe(false);
    expect(validationProvider.checkValid()).toBe(false);
  }));

  it('reset', inject(function() {
    var resetSpy = jasmine.createSpy('resetSpy');
    $scope.$on('requiredreset-' + $scope.Form.required.validationId, function() {
      resetSpy();
    });
    validationProvider.reset($scope.Form);
    expect(element.find('p')[0]).toBeUndefined();
    expect(resetSpy).toHaveBeenCalled();
  }));

  it('validate - submit', inject(function() {
    var submitSpy = jasmine.createSpy('submitSpy');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');
    var submitSpy2 = jasmine.createSpy('submitSpy2');
    var successSpy2 = jasmine.createSpy('successSpy2');
    var errorSpy2 = jasmine.createSpy('errorSpy2');

    // test .success()
    $scope.$on('requiredsubmit-' + $scope.Form.required.validationId, function() {
      submitSpy();
    });
    $scope.$apply(function() {
      $scope.required = 'Required';
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

    // test .error()
    $scope.$apply(function() {
      $scope.required = '';
    });

    $scope.$on('requiredsubmit-' + $scope.Form.required.validationId, function() {
      submitSpy2();
    });

    validationProvider.validate($scope.Form)
      .success(function() {
        successSpy2();
      })
      .error(function() {
        errorSpy2();
      });

    $timeout.flush();
    expect(submitSpy2).toHaveBeenCalled();
    expect(successSpy2).not.toHaveBeenCalled();
    expect(errorSpy2).toHaveBeenCalled();
  }));

  it('validate - single input', inject(function() {
    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"/><input type="text" name="required2" ng-model="required2" validator="required"/></form>')($scope);

    var submitSpy = jasmine.createSpy('submitSpy');
    var submitSpy2 = jasmine.createSpy('submitSpy2');
    var successSpy = jasmine.createSpy('successSpy');
    var errorSpy = jasmine.createSpy('errorSpy');

    $scope.$on('requiredsubmit-' + $scope.Form.required.validationId, function() {
      submitSpy();
    });
    $scope.$on('required2submit-' + $scope.Form.required2.validationId, function() {
      submitSpy2();
    });
    $scope.$apply(function() {
      $scope.required = 'Required';
      $scope.required2 = 'Required';
    });
    validationProvider.validate($scope.Form.required)
      .success(function() {
        successSpy();
      })
      .error(function() {
        errorSpy();
      });

    $timeout.flush();
    expect(submitSpy).toHaveBeenCalled();
    expect(submitSpy2).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();

  }));

  // TODO - Missing multiple input []

  it('validate invalid form', inject(function() {
    console.error = function(msg) {
      expect(msg).toBe('This is not a regular Form name scope');
    };

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
    $timeout.flush();

    validationProvider.validate($scope.Form2);

  }));

  it('reset invalid form', inject(function() {
    console.error = function(msg) {
      expect(msg).toBe('This is not a regular Form name scope');
    };

    element = $compile('<form name="Form"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
    $timeout.flush();

    validationProvider.reset($scope.Form2);

  }));

  it('set/get validMethod', inject(function() {
    expect(validationProvider.getValidMethod()).toEqual(null);

    validationProvider.setValidMethod('submit');

    expect(validationProvider.getValidMethod()).toEqual('submit');
  }));



  describe('validationProvider.addMsgElement', function() {
    /**
     * TEST CASE:Check if Default $validationProvider.addMsgElement is defined as a Function
     * TEST TYPE: UNIT
     *   [STEP 1] SET defaultAddMsg =  $validationProvider.addMsgElement
     *   Expected: defaultAddMsg is defined AND (defaultAddMsg instanceof Function) === true
     */
    it('default value is defined as a Function', inject(function($validation) {
      expect($validation.addMsgElement instanceof Function).toBe(true);
    })); //END it


    /**
     * TEST CASE:Check if Default $validationProvider.addMsgElement is right after input element
     * Test TYPE: E2E
     *   [STEP 1] SET Up <input type="text" />
     *   Expected: Msg-Element is right after Input element & Total Msg-Element = 1
     */
    it('default element is right after input element', inject(function($validation) {
      var msgElement = element.find('span');
      expect(msgElement.length).toEqual(1);

      var elementAfterInput = element.find('input').next();
      expect(msgElement[0].isSameNode(elementAfterInput[0])).toBe(true);
    })); //END it


    /**
     * TEST CASE:Check if custom $validationProvider.addMsgElement is consistent (do not be modified/injected)
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom addMsgElement method
     *   [STEP 2] Place validator directive in the UI
     *   Expected: custom method is not be modified
     */
    it('custom element is consistent', inject(function($validation) {
      var customMsgElement = function(elm) {};
      $validation.addMsgElement = customMsgElement;
      $compile('<form name="CustomMsgElmForm"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
      expect($validation.addMsgElement).toEqual(customMsgElement);
    })); //END it

    /**
     * TEST CASE:Check if custom $validationProvider.addMsgElement is placed correctly
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom addMsgElement method to push MsgElement as the first child of "Form" element
     *   [STEP 2] Place validator directive in the UI
     *   Expected: MsgElement is placed as the first child element
     */
    it('custom element is placed correctly', inject(function($validation) {
      $validation.addMsgElement = function(elm) {
        elm.parent().prepend('<div></div>');
      };
      var formElementForCustomMsgElm = $compile('<form name="CustomMsgElmForm"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);

      var elementFirstChild = formElementForCustomMsgElm.children()[0];
      var elementFromSetting = formElementForCustomMsgElm.find('div')[0];

      expect(elementFromSetting.isSameNode(elementFirstChild)).toBe(true);
    })); //END it


    /**
     * TEST CASE:Check if custom $validationProvider.addMsgElement received correct parameters
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom addMsgElement 
     *   [STEP 2] Place validator directive in the UI
     *   Expected: addMsgElement has 01 parameter, parameter data type = DOMElement
     */
    it('received correct parameters', inject(function($validation) {
      $validation.addMsgElement = function() {
        expect(arguments.length).toEqual(1);
        expect(angular.isElement(arguments[0])).toBe(true);
      };
      $compile('<form name="CustomMsgElmForm"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);

    })); //END it


  }); //END describe

  describe('validationProvider.getMsgElement', function() {
    /**
     * TEST CASE:Check if $validationProvider.getMsgElement is defined as a Function
     * TEST TYPE: UNIT
     *   [STEP 1] SET defaultgetMsg =  $validationProvider.getMsgElement
     *   Expected: (getMsgElement instanceof Function) === true
     */
    it('default value is defined as a Function', inject(function($validation) {
      expect($validation.getMsgElement instanceof Function).toBe(true);
    })); //END it

    /**
     * TEST CASE:Check if default $validationProvider.getMsgElement is right after input element
     * TEST TYPE: E2E
     *   [STEP 1] SET Up Input A:  <input type="text" />
     *   [STEP 2] Get Element B right after Input A
     *   Expected: (Element B) is (element returned from $validationProvider.getMsgElement() );
     */
    it('default element is right after input element', inject(function($validation) {
      var inputElement = element.find('input');
      var elementAfterInput = inputElement.next();
      var elementFromSetting = $validation.getMsgElement(inputElement);

      expect(elementFromSetting[0].isSameNode(elementAfterInput[0])).toBe(true);
    })); //END it


    /**
     * TEST CASE:Check if custom $validationProvider.getMsgElement is consistent (do not be modified/injected)
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom getMsgElement method
     *   [STEP 2] Place validator directive in the UI
     *   Expected: custom method is not be modified
     */
    it('custom element is consistent', inject(function($validation) {
      var customMsgElement = function(elm) {};
      $validation.getMsgElement = customMsgElement;
      $compile('<form name="CustomMsgElmForm"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
      expect($validation.getMsgElement).toEqual(customMsgElement);
    })); //END it

    /**
     * TEST CASE:Check if custom $validationProvider.getMsgElement is gotten correctly
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom getMsgElement method to get first child of "Form" element.
     *   [STEP 2] Place validator directive in the UI
     *   Expected: MsgElement is placed as the first child element
     */
    it('custom element is placed correctly', inject(function($validation) {
      $validation.getMsgElement = function(elm) {
        return formElementForCustomMsgElm.children()[0];
      };
      var formElementForCustomMsgElm = $compile('<form name="CustomMsgElmForm"><div></div><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);
      var inputElement = formElementForCustomMsgElm.find('input');

      var elementFirstChild = formElementForCustomMsgElm.children()[0];

      var elementFromSetting = $validation.getMsgElement(inputElement);

      expect(elementFromSetting.isSameNode(elementFirstChild)).toBe(true);
    })); //END it

    /**
     * TEST CASE:Check if custom $validationProvider.getMsgElement received correct parameters
     * Test TYPE: E2E
     *   [STEP 1] SET Up custom getMsgElement 
     *   [STEP 2] Place validator directive in the UI
     *   Expected: getMsgElement has 01 parameter, parameter data type = DOMElement
     */
    it('received correct parameters', inject(function($validation) {
      $validation.getMsgElement = function() {
        expect(arguments.length).toEqual(1);
        expect(angular.isElement(arguments[0])).toBe(true);
      };
      $compile('<form name="CustomMsgElmForm"><input type="text" name="required" ng-model="required" validator="required"></form>')($scope);

    })); //END it

  }); //END describe


});
