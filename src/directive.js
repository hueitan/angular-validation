(function () {
    angular.module('validation.directive', ['validation.provider'])
        .directive('validator', ['$validation', function ($validationProvider) {

            /**
             * Do this function iff validation valid
             * @param element
             * @param validMessage
             * @param validation
             * @param callback
             */
            var validFunc = function (element, validMessage, validation, callback) {
                element.next().html($validationProvider.successHTML(validMessage || $validationProvider.getDefaultMsg(validation).success));
                if (callback) callback();
            };


            /**
             * Do this function iff validation invalid
             * @param element
             * @param validMessage
             * @param validation
             * @param callback
             */
            var invalidFunc = function (element, validMessage, validation, callback) {
                element.next().html($validationProvider.errorHTML(validMessage || $validationProvider.getDefaultMsg(validation).error));
                if (callback) callback();
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
                        var successMessage = validation + 'SuccessMessage',
                            errorMessage = validation + 'ErrorMessage';

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
                                    if ($validationProvider.getExpression(validation).test(value)) {
                                        validFunc(element, attrs[successMessage], validation, scope.validCallback());

                                        ctrl.$setValidity(ctrl.$name, true);
                                    } else {
                                        invalidFunc(element, attrs[errorMessage], validation, scope.invalidCallback());

                                        ctrl.$setValidity(ctrl.$name, false);
                                    }
                                });
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

                            if ($validationProvider.getExpression(validation).test(value)) {
                                validFunc(element, attrs[successMessage], validation, scope.validCallback());

                                ctrl.$setValidity(ctrl.$name, true);
                            } else {
                                invalidFunc(element, attrs[errorMessage], validation, scope.invalidCallback());

                                ctrl.$setValidity(ctrl.$name, false);
                            }
                        });


                    });
                }
            }
        }]);
}).call(this);