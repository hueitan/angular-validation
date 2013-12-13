(function () {
    angular.module('validation.directive', ['validation.provider'])
        .directive('validator', ['validationProvider', function ($validationProvider) {

            /**
             * Do this function iff validation valid
             * @param element
             * @param validMessage
             * @param validation
             * @param callback
             */
            var validFunc = function (element, validMessage, validation, callback) {
                element.next().remove();
                element.after($validationProvider.successHTML(validMessage || $validationProvider.defaultMsg[validation].success));
                $validationProvider.valid[validation] = true;
                if (callback) callback();
            };


            /**
             * Do this function iff validation invalid
             * @param element
             * @param validMessage
             * @param validation
             */
            var invalidFunc = function (element, validMessage, validation, callback) {
                element.next().remove();
                element.after($validationProvider.errorHTML(validMessage || $validationProvider.defaultMsg[validation].error));
                $validationProvider.valid[validation] = false;
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

                        scope.$watch('model', function (value) {

                            /**
                             * dirty, pristine, viewValue control here
                             */
                            if (ctrl.$pristine && ctrl.$viewValue) {
                            }
                            else if (ctrl.$pristine) {
                                return;
                            }

                            if ($validationProvider.expression[validation].test(value)) {
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