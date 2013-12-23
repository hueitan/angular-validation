(function () {
    angular.module('validation.directive', ['validation.provider'])
        .directive('validator', ['$validation', function ($validationProvider) {

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
                element.next().html($validationProvider.successHTML(validMessage || $validationProvider.getDefaultMsg(validation).success));
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
                element.next().html($validationProvider.errorHTML(validMessage || $validationProvider.getDefaultMsg(validation).error));
                ctrl.$setValidity(ctrl.$name, false);
                if (callback) callback();
                return false;
            };


            /**
             * Check Validation
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
                    errorMessage = validation + 'ErrorMessage';

                if ($validationProvider.getExpression(validation).test(value)) {
                    return validFunc(element, attrs[successMessage], validation, scope.validCallback(), ctrl);
                } else {
                    return invalidFunc(element, attrs[errorMessage], validation, scope.invalidCallback(), ctrl);
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
                     * Check Every validator
                     */
                    validator.forEach(function (validation) {

                        /**
                         * Set Validity to false when Initial
                         */
                        ctrl.$setValidity(ctrl.$name, false);


                        /**
                         * Validate blur method
                         */
                        if (attrs.validMethod === 'blur') {
                            element.bind('blur', function () {
                                var value = element[0].value;
                                scope.$apply(function () {
                                    checkValidation(scope, element, attrs, ctrl, validation, value);
                                });
                            });

                            return;
                        }


                        /**
                         * Validate submit method
                         */
                        if (attrs.validMethod === 'submit') {
                            scope.$on('submit', function (event) {
                                var value = element[0].value;
                                return checkValidation(scope, element, attrs, ctrl, validation, value);
                            });

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
                }
            }
        }]);
}).call(this);