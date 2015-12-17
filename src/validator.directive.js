(function() {
  angular
    .module('validation.directive')
    .directive('validator', Validator);

  function Validator($injector) {
    var $validationProvider = $injector.get('$validation');
    var $q = $injector.get('$q');
    var $timeout = $injector.get('$timeout');
    var $parse = $injector.get('$parse');

    /**
     * Do this function if validation valid
     * @param element
     * @param validMessage
     * @param validation
     * @param callback
     * @param ctrl
     * @returns {}
     */
    var validFunc = function(element, validMessage, validation, scope, ctrl, attrs) {
      var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).success;
      var validCallback = $parse('success');
      var messageElem;

      if (attrs.messageId) messageElem = angular.element(document.querySelector('#' + attrs.messageId));
      else messageElem = element.next();

      if (element.attr('no-validation-message')) {
        messageElem.css('display', 'none');
      } else if ($validationProvider.showSuccessMessage && messageToShow) {
        messageElem.html($validationProvider.getSuccessHTML(messageToShow));
        messageElem.css('display', '');
      } else {
        messageElem.css('display', 'none');
      }

      ctrl.$setValidity(ctrl.$name, true);
      if (validCallback) validCallback({
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
    var invalidFunc = function(element, validMessage, validation, scope, ctrl, attrs) {
      var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).error;
      var invalidCallback = $parse('error');
      var messageElem;

      if (attrs.messageId) messageElem = angular.element(document.querySelector('#' + attrs.messageId));
      else messageElem = element.next();

      if (element.attr('no-validation-message')) {
        messageElem.css('display', 'none');
      } else if ($validationProvider.showErrorMessage && messageToShow) {
        messageElem.html($validationProvider.getErrorHTML(messageToShow));
        messageElem.css('display', '');
      } else {
        messageElem.css('display', 'none');
      }

      ctrl.$setValidity(ctrl.$name, false);
      if (invalidCallback) invalidCallback({
        message: messageToShow
      });
      if ($validationProvider.invalidCallback) $validationProvider.invalidCallback(element);

      return false;
    };


    /**
     * collect elements for focus
     * @type {Object}
     ***private variable
     */
    var focusElements = {};


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
      var valid = {
        success: function() {
          validFunc(element, attrs[successMessage], validator, scope, ctrl, attrs);
          if (leftValidation.length) {
            return checkValidation(scope, element, attrs, ctrl, leftValidation, value);
          } else {
            return true;
          }
        },
        error: function() {
          return invalidFunc(element, attrs[errorMessage], validator, scope, ctrl, attrs);
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
            if (data && data.length > 0 && data[0]) return valid.success();
            else return valid.error();
          }, function() {
            return valid.error();
          });
      }

      // Check with RegExp
      else if (expression.constructor === RegExp) {
        // Only apply the test if the value is neither undefined or null
        if (value !== undefined && value !== null) return $validationProvider.getExpression(validator).test(value) ? valid.success() : valid.error();
        else return valid.error();
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
        var validation = attrs.validator.split(',');

        /**
         * guid use
         */
        var uid = ctrl.validationId = guid();


        /**
         * Set initial validity to undefined if no boolean value is transmitted
         */
        var initialValidity;
        if (typeof scope.initialValidity === 'boolean') {
          initialValidity = scope.initialValidity;
        }

        /**
         * Default Valid/Invalid Message
         */
        if (!attrs.messageId) element.after('<span></span>');

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
            ctrl.$setViewValue('');
            ctrl.$setPristine();
            ctrl.$setValidity(ctrl.$name, undefined);
            ctrl.$render();
            if (attrs.messageId) angular.element(document.querySelector('#' + attrs.messageId)).html('');
            else element.next().html('');

            if ($validationProvider.resetCallback) $validationProvider.resetCallback(element);
          });
        });

        /**
         * Check validator
         */


        var validMethod = (angular.isUndefined(attrs.validMethod)) ? $validationProvider.getValidMethod() : attrs.validMethod;

        /**
         * Click submit form, check the validity when submit
         */
        scope.$on(ctrl.$name + 'submit-' + uid, function(event, index) {
          var value = ctrl.$viewValue;
          var isValid = false;

          isValid = checkValidation(scope, element, attrs, ctrl, validation, value);

          if (validMethod === 'submit') {
            // clear previous scope.$watch
            watch();
            watch = scope.$watch(function() {
              return scope.$eval(attrs.ngModel);
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
            var value = scope.$eval(attrs.ngModel);
            scope.$apply(function() {
              checkValidation(scope, element, attrs, ctrl, validation, value);
            });
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
          return scope.$eval(attrs.ngModel);
        }, function(value) {
          /**
           * dirty, pristine, viewValue control here
           */
          if (ctrl.$pristine && ctrl.$viewValue) {
            // has value when initial
            ctrl.$setViewValue(ctrl.$viewValue);
          } else if (ctrl.$pristine) {
            // Don't validate form when the input is clean(pristine)
            if (attrs.messageId) angular.element(document.querySelector('#' + attrs.messageId)).html('');
            else element.next().html('');
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
            if (attrs.messageId) el = angular.element(document.querySelector('#' + attrs.messageId));
            else el = element.next();
            if (value === 'true' || value === true) el.css('display', 'none');
            else if (value === 'false' || value === false) el.css('display', 'block');
          });
        });
      }
    };
  }
  Validator.$inject = ['$injector'];
}).call(this);
