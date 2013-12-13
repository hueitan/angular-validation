
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
                        switch (validation) {
                            case 'required':
                                /**
                                 * Validator 'required'
                                 * valid iff value exists
                                 */
                                scope.$watch('model', function (value) {
                                    if (value) {
                                        validFunc(element, attrs.requiredSuccessMessage, validation, scope.validCallback());
                                        ctrl.$setValidity(ctrl.$name, true);
                                    } else {
                                        invalidFunc(element, attrs.requiredErrorMessage, validation, scope.invalidCallback());
                                        ctrl.$setValidity(ctrl.$name, false);
                                    }
                                });
                                break;
                            case 'url':
                                /**
                                 * Validator 'url'
                                 * valid iff the input is url format
                                 */
                                var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
                                scope.$watch('model', function (value) {
                                    if (expression.test(value)) {
                                        validFunc(element, attrs.urlSuccessMessage, validation);
                                        ctrl.$setValidity(ctrl.$name, true);
                                    } else {
                                        invalidFunc(element, attrs.urlErrorMessage, validation);
                                        ctrl.$setValidity(ctrl.$name, false);
                                    }
                                });
                                break;
                            default:
                                /**
                                 * Default
                                 */
                                break;
                        }
                    });
                }
            }
        }]);
}).call(this);