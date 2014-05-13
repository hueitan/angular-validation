(function () {
    angular.module('validation.directive', ['validation.provider'])
        .directive('validator', ['$injector', function ($injector) {

            var $validationProvider = $injector.get('$validation'),
                $q = $injector.get('$q'),
                $timeout = $injector.get('$timeout');

            /**
             * Do this function iff validation valid
             * @param element
             * @param validMessage
             * @param validation
             * @param callback
             * @param ctrl
             * @returns {}
             */
            var validFunc = function (element, validMessage, validation, callback, ctrl) {
                if ($validationProvider.showSuccessMessage) {
                    element.next().html($validationProvider.getSuccessHTML(validMessage || $validationProvider.getDefaultMsg(validation).success));
                } else {
                    element.next().html('');
                }
                ctrl.$setValidity(ctrl.$name, true);
                if (callback) callback();

                return true;
            };


            /**
             * Do this function iff validation invalid
             * @param element
             * @param validMessage
             * @param validation
             * @param callback
             * @param ctrl
             * @returns {}
             */
            var invalidFunc = function (element, validMessage, validation, callback, ctrl) {
                if ($validationProvider.showErrorMessage) {
                    element.next().html($validationProvider.getErrorHTML(validMessage || $validationProvider.getDefaultMsg(validation).error));
                } else {
                    element.next().html('');
                }
                ctrl.$setValidity(ctrl.$name, false);
                if (callback) callback();

                return false;
            };


            /**
             * If var is true, focus element when validate end
             * @type {boolean}
             ***private variable
             */
            var isFocusElement = false;


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
            var checkValidation = function (scope, element, attrs, ctrl, validation, value) {
                var successMessage = validation + 'SuccessMessage',
                    errorMessage = validation + 'ErrorMessage',
                    expressionType = $validationProvider.getExpression(validation).constructor,
                    valid = {
                        success: function () {
                            return validFunc(element, attrs[successMessage], validation, scope.validCallback, ctrl);
                        },
                        error: function () {
                            return invalidFunc(element, attrs[errorMessage], validation, scope.invalidCallback, ctrl);
                        }
                    };

                // Check with Function
                if (expressionType === Function) {
                    return $q.all([$validationProvider.getExpression(validation)(value)])
                        .then(function (data) {
                            if (data && data.length > 0 && data[0]) {
                                return valid.success();
                            } else {
                                return valid.error();
                            }
                        }, function () {
                            return valid.error();
                        });
                }
                // Check with RegExp
                else if (expressionType === RegExp) {
                    return $validationProvider.getExpression(validation).test(value) ? valid.success() : valid.error();
                } else {
                    return valid.error();
                }
            };


            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    model: '=ngModel',
                    validCallback: '&',
                    invalidCallback: '&'
                },
                link: function (scope, element, attrs, ctrl) {

                    /**
                     * watch
                     * @type {watch}
                     *
                     * Use to collect scope.$watch method
                     *
                     * use watch() to destroy the $watch method
                     */
                    var watch = function () {};

                    /**
                     * validator
                     * @type {*|Array}
                     *
                     * Convert user input String to Array
                     */
                    var validator = attrs.validator.split(',');

                    /**
                     * Valid/Invalid Message
                     */
                    element.after('<span></span>');

                    /**
                     * Set Validity to false when Initial
                     */
                    ctrl.$setValidity(ctrl.$name, false);

                    /**
                     * Reset the validation for specific form
                     */
                    scope.$on(ctrl.$name + 'reset', function () {

                        /**
                         * clear scope.$watch here
                         * when reset status
                         * clear the $watch method to prevent
                         * $watch again while reset the form
                         */
                        watch();

                        isFocusElement = false;
                        ctrl.$setViewValue('');
                        ctrl.$setPristine();
                        ctrl.$setValidity(ctrl.$name, false);
                        ctrl.$render();
                        element.next().html('');
                    });

                    /**
                     * Check Every validator
                     */
                    validator.forEach(function (validation) {

                        /**
                         * Click submit form, check the validity when submit
                         */
                        scope.$on(ctrl.$name + 'submit', function (event, index) {
                            var value = element[0].value,
                                isValid = false;

                            if (index == 0) {
                                isFocusElement = false;
                            }

                            isValid = checkValidation(scope, element, attrs, ctrl, validation, value);

                            if (attrs.validMethod === 'submit') {
                                watch(); // clear previous scope.$watch
                                watch = scope.$watch('model', function (value, oldValue) {

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

                            // Focus first input element when submit error #11
                            if (!isFocusElement && !isValid) {
                                isFocusElement = true;
                                element[0].focus();
                            }
                        });

                        /**
                         * Validate blur method
                         */
                        if (attrs.validMethod === 'blur') {
                            element.bind('blur', function () {
                                var value = element[0].value;
                                scope.$apply(function() {
                                    checkValidation(scope, element, attrs, ctrl, validation, value);
                                });
                            });

                            return;
                        }

                        /**
                         * Validate submit & submit-only method
                         */
                        if (attrs.validMethod === 'submit' || attrs.validMethod === 'submit-only') {
                            return;
                        }

                        /**
                         * Validate watch method
                         * This is the default method
                         */
                        scope.$watch('model', function (value) {
                            /**
                             * dirty, pristine, viewValue control here
                             */
                            if (ctrl.$pristine && ctrl.$viewValue) {
                                // has value when initial
                                ctrl.$setViewValue(ctrl.$viewValue);
                            } else if (ctrl.$pristine) {
                                // Don't validate form when the input is clean(pristine)
                                element.next().html('');
                                return;
                            }
                            checkValidation(scope, element, attrs, ctrl, validation, value);
                        });

                    });

                    $timeout(function () {
                        /**
                         * Don't showup the validation Message
                         */
                        attrs.$observe('noValidationMessage', function (value) {
                            var el = element.next();
                            if (value == "true" || value == true) {
                                el.css('display', 'none');
                            } else if (value == "false" || value == false) {
                                el.css('display', 'block');
                            } else {
                            }
                        });
                    });

                }
            };
        }]);
}).call(this);
