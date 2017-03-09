(function() {
  angular
    .module('validation.directive')
    .directive('validator', Validator);

  function Validator($injector) {
    var $validationProvider = $injector.get('$validation');
    var $q = $injector.get('$q');
    var $timeout = $injector.get('$timeout');
    var $compile = $injector.get('$compile');
    var $parse = $injector.get('$parse');
    var groups = {};

    /**
     * Do this function if validation valid
     * @param element
     * @param validMessage
     * @param validation
     * @param callback
     * @param ctrl
     * @returns {}
     */
    var validFunc = function(element, validMessage, validation, scope, ctrl, attrs, param) {
      var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).success;
      var validCallback = $parse(attrs.validCallback);
      var messageId = attrs.messageId;
      var validationGroup = attrs.validationGroup;
      var messageElem;

      if (messageId || validationGroup) messageElem = angular.element(document.querySelector('#' + (messageId || validationGroup)));
      else messageElem = $validationProvider.getMsgElement(element);

      if (element.attr('no-validation-message')) {
        messageElem.css('display', 'none');
      } else if ($validationProvider.showSuccessMessage && messageToShow) {
        messageToShow = angular.isFunction(messageToShow) ? messageToShow(element, attrs, param) : messageToShow;

        messageElem.html('').append($compile($validationProvider.getSuccessHTML(messageToShow, element, attrs))(scope));
        messageElem.css('display', '');
      } else {
        messageElem.css('display', 'none');
      }

      ctrl.$setValidity(ctrl.$name, true);
      validCallback(scope, {
        message: messageToShow
      });
      if ($validationProvider.validCallback) $validationProvider.validCallback(element);

      return true;
    };


    /**
     * Do this function if validation invalid
     * @param element
     * @param validMessage
     * @param validation
     * @param callback
     * @param ctrl
     * @returns {}
     */
    var invalidFunc = function(element, validMessage, validation, scope, ctrl, attrs, param) {
      var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).error;
      var invalidCallback = $parse(attrs.invalidCallback);
      var messageId = attrs.messageId;
      var validationGroup = attrs.validationGroup;
      var messageElem;

      if (messageId || validationGroup) messageElem = angular.element(document.querySelector('#' + (messageId || validationGroup)));
      else messageElem = $validationProvider.getMsgElement(element);

      if (element.attr('no-validation-message')) {
        messageElem.css('display', 'none');
      } else if ($validationProvider.showErrorMessage && messageToShow) {
        messageToShow = angular.isFunction(messageToShow) ? messageToShow(element, attrs, param) : messageToShow;

        messageElem.html('').append($compile($validationProvider.getErrorHTML(messageToShow, element, attrs))(scope));
        messageElem.css('display', '');
      } else {
        messageElem.css('display', 'none');
      }

      ctrl.$setValidity(ctrl.$name, false);
      invalidCallback(scope, {
        message: messageToShow
      });
      if ($validationProvider.invalidCallback) $validationProvider.invalidCallback(element);

      return false;
    };

    /**
     * Verify whether there is one of the elements inside the group valid.
     * If so, it returns true, otherwise, it returns false
     *
     * @param validationGroup
     * @return {boolean}
     */
    var checkValidationGroup = function(validationGroup) {
      var group = groups[validationGroup];

      return Object.keys(group).some(function(key) {
        return group[key];
      });
    };

    /**
     * Set validity to all elements inside the given group
     *
     * @param scope
     * @param groupName
     * @param validity
     */
    function setValidationGroup(scope, validationGroup, validity) {
      var validationGroupElems = document.querySelectorAll('*[validation-group=' + validationGroup + ']');

      // Loop through all elements inside the group
      for (var i = 0, len = validationGroupElems.length; i < len; i++) {
        var elem = validationGroupElems[i];
        var formName = elem.form.name;
        var elemName = elem.name;
        scope[formName][elemName].$setValidity(elemName, validity);
      }
    }

    /**
     * collect elements for focus
     * @type {Object}
     ***private variable
     */
    var focusElements = {};

    /**
     * Get Validation Result Object
     * @param data
     * @returns {
     *    result: Boolean, // is success or error
     *    message: String  // tips
     * }
     */
    function getResultObj(data) {
      var res = {};
      if (data && data.length > 0) {
        res = data[0];
        if (!angular.isObject(res)) {
          res = {
            result: res,
            message: ''
          };
        }
      } else {
        res = {
          result: false,
          message: ''
        };
      }
      return res;
    }

    /**
     * Check Validation with Function or RegExp
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     * @param validation
     * @param value
     * @returns {}
     */
    var checkValidation = function(scope, element, attrs, ctrl, validation, value) {
      var validators = validation.slice(0);
      var validatorExpr = validators[0].trim();
      var paramIndex = validatorExpr.indexOf('=');
      var validator = paramIndex === -1 ? validatorExpr : validatorExpr.substr(0, paramIndex);
      var validatorParam = paramIndex === -1 ? null : validatorExpr.substr(paramIndex + 1);
      var leftValidation = validators.slice(1);
      var successMessage = validator + 'SuccessMessage';
      var errorMessage = validator + 'ErrorMessage';
      var expression = $validationProvider.getExpression(validator);
      var validationGroup = attrs.validationGroup;
      var valid = {
        success: function(message) {
          validFunc(element, message || attrs[successMessage], validator, scope, ctrl, attrs, validatorParam);
          if (leftValidation.length) {
            return checkValidation(scope, element, attrs, ctrl, leftValidation, value);
          } else {
            return true;
          }
        },
        error: function(message) {
          return invalidFunc(element, message || attrs[errorMessage], validator, scope, ctrl, attrs, validatorParam);
        }
      };

      if (expression === undefined) {
        console.error('You are using undefined validator "%s"', validator);
        if (leftValidation.length) return checkValidation(scope, element, attrs, ctrl, leftValidation, value);
        else return;
      }
      // Check with Function
      if (expression.constructor === Function) {
        return $q.all([$validationProvider.getExpression(validator)(value, scope, element, attrs, validatorParam)])
          .then(function(data) {
            var resultObj = getResultObj(data);
            var message = resultObj.message;
            if (resultObj.result) {
              if (validationGroup) {
                groups[validationGroup][ctrl.$name] = true;
                setValidationGroup(scope, validationGroup, true);
              }
              return valid.success(message);
            } else if (validationGroup) {
              groups[validationGroup][ctrl.$name] = false;

              // Whenever the element is invalid, we'll check whether one of the elements inside the its group valid or not.
              // If there is a valid element, its invalid message won't be shown, Otherwise, shows its invalid message.
              if (checkValidationGroup(validationGroup)) {
                setValidationGroup(scope, validationGroup, true);
              } else {
                setValidationGroup(scope, validationGroup, false);
                return valid.error(message);
              }
            } else return valid.error(message);
          }, function() {
            return valid.error();
          });
      }

      // Check with RegExp
      else if (expression.constructor === RegExp) {
        // Only apply the test if the value is neither undefined or null
        if (value !== undefined && value !== null) {
          if ($validationProvider.getExpression(validator).test(value)) {
            if (validationGroup) {
              groups[validationGroup][ctrl.$name] = true;
              setValidationGroup(scope, validationGroup, true);
            }
            return valid.success();
          } else if (validationGroup) {
            groups[validationGroup][ctrl.$name] = false;

            // Whenever the element is invalid, we'll check whether one of the elements inside the its group valid or not.
            // If there is a valid element, its invalid message won't be shown, Otherwise, shows its invalid message.
            if (checkValidationGroup(validationGroup)) {
              setValidationGroup(scope, validationGroup, true);
            } else {
              setValidationGroup(scope, validationGroup, false);
              return valid.error();
            }
          } else return valid.error();
        }
      } else return valid.error();
    };

    /**
     * generate unique guid
     */
    var s4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var guid = function() {
      return (s4() + s4() + s4() + s4());
    };


    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        /**
         * All attributes
         */
        var useViewValue = attrs.useViewValue !== 'false';
        var validator = attrs.validator;
        var messageId = attrs.messageId;
        var validationGroup = attrs.validationGroup;
        var validMethod = attrs.validMethod;
        var ngModel = attrs.ngModel;

        /**
         * watch
         * @type {watch}
         *
         * Use to collect scope.$watch method
         *
         * use watch() to destroy the $watch method
         */
        var watch = function() {};

        /**
         * validator
         * @type {Array}
         *
         * Convert user input String to Array
         */
        var validation = validator.split(',');

        /**
         * guid use
         */
        var uid = ctrl.validationId = guid();

        /**
         * to have a value to rollback to
         */
        var originalViewValue = null;

        /**
         * Set initial validity to undefined if no boolean value is transmitted
         */
        var initialValidity = void 0;
        if (typeof attrs.initialValidity === 'boolean') {
          initialValidity = attrs.initialValidity;
        }

        /**
         * Observe validator changes in order to allow dynamically change it
         */
        attrs.$observe('validator', function(value) {
          validation = value.split(',');
        });

        /**
         * Set up groups object in order to keep track validation of elements
         */
        if (validationGroup) {
          if (!groups[validationGroup]) groups[validationGroup] = {};
          groups[validationGroup][ctrl.$name] = false;
        }

        /**
         * Default Valid/Invalid Message
         */
        if (!(messageId || validationGroup)) $validationProvider.addMsgElement(element);

        /**
         * Set custom initial validity
         * Usage: <input initial-validity="true" ... >
         */
        ctrl.$setValidity(ctrl.$name, initialValidity);

        /**
         * Reset the validation for specific form
         */
        scope.$on(ctrl.$name + 'reset-' + uid, function() {
          /**
           * clear scope.$watch here
           * when reset status
           * clear the $watch method to prevent
           * $watch again while reset the form
           */
          watch();

          $timeout(function() {
            ctrl.$setViewValue(originalViewValue);
            ctrl.$setPristine();
            ctrl.$setValidity(ctrl.$name, undefined);
            ctrl.$render();
            if (messageId || validationGroup) angular.element(document.querySelector('#' + (messageId || validationGroup))).html('');
            else $validationProvider.getMsgElement(element).html('');

            if ($validationProvider.resetCallback) $validationProvider.resetCallback(element);
          });
        });

        /**
         * Check validator
         */
        validMethod = (angular.isUndefined(validMethod)) ? $validationProvider.getValidMethod() : validMethod;

        /**
         * Click submit form, check the validity when submit
         */
        scope.$on(ctrl.$name + 'submit-' + uid, function(event, index) {
          var value = useViewValue ? ctrl.$viewValue : ctrl.$modelValue;
          var isValid = false;

          isValid = checkValidation(scope, element, attrs, ctrl, validation, value);

          if (validMethod === 'submit') {
            // clear previous scope.$watch
            watch();
            watch = scope.$watch(function() {
              return scope.$eval(ngModel);
            }, function(value, oldValue) {
              // don't watch when init
              if (value === oldValue) {
                return;
              }

              // scope.$watch will translate '' to undefined
              // undefined/null will pass the required submit /^.+/
              // cause some error in this validation
              if (value === undefined || value === null) {
                value = '';
              }

              isValid = checkValidation(scope, element, attrs, ctrl, validation, value);
            });
          }

          var setFocus = function(isValid) {
            if (isValid) {
              delete focusElements[index];
            } else {
              focusElements[index] = element[0];

              $timeout(function() {
                focusElements[Math.min.apply(null, Object.keys(focusElements))].focus();
              }, 0);
            }
          };

          if (isValid.constructor === Object) isValid.then(setFocus);
          else setFocus(isValid);
        });

        /**
         * Validate blur method
         */
        if (validMethod === 'blur') {
          element.bind('blur', function() {
            var value = scope.$eval(ngModel);

            if (scope.$root.$$phase !== '$apply') {
              scope.$apply(function() {
                checkValidation(scope, element, attrs, ctrl, validation, value);
              });
            } else {
              checkValidation(scope, element, attrs, ctrl, validation, value);
            }
          });

          return;
        }

        /**
         * Validate submit & submit-only method
         */
        if (validMethod === 'submit' || validMethod === 'submit-only') {
          return;
        }

        /**
         * Validate watch method
         * This is the default method
         */
        scope.$watch(function() {
          return scope.$eval(ngModel);
        }, function(value) {
          /**
           * dirty, pristine, viewValue control here
           */
          if (ctrl.$pristine && ctrl.$viewValue) {
            // has value when initial
            originalViewValue = ctrl.$viewValue || '';
            ctrl.$setViewValue(ctrl.$viewValue);
          } else if (ctrl.$pristine) {
            // Don't validate form when the input is clean(pristine)
            if (messageId || validationGroup) angular.element(document.querySelector('#' + (messageId || validationGroup))).html('');
            else $validationProvider.getMsgElement(element).html('');
            return;
          }
          checkValidation(scope, element, attrs, ctrl, validation, value);
        });

        $timeout(function() {
          /**
           * Don't showup the validation Message
           */
          attrs.$observe('noValidationMessage', function(value) {
            var el;
            if (messageId || validationGroup) el = angular.element(document.querySelector('#' + (messageId || validationGroup)));
            else el = $validationProvider.getMsgElement(element);
            if (value === 'true' || value === true) el.css('display', 'none');
            else if (value === 'false' || value === false) el.css('display', 'block');
          });
        });
      }
    };
  }
  Validator.$inject = ['$injector'];
}).call(this);
