
(function () {
    angular.module('validation', ['validation.provider', 'validation.directive']);
}).call(this);

(function () {
    angular.module('validation.provider', [])
        .provider('validationProvider', function () {

            /**
             * true if the form is true, else false
             * @type {{}}
             */
            var valid = {};


            /**
             * default error, success message
             * @type {{required: {error: string, success: string}, url: {error: string, success: string}}}
             */
            var defaultMsg = {
                required: {
                    error: 'This should be Required!!',
                    success: 'It\'s Required'
                },
                url: {
                    error: 'This should be Url',
                    success: 'It\'s Url'
                }
            };

            /**
             * Allow user to set default message
             * @param obj
             */
            var setupDefaultMsg = function (obj) {
                angular.extend(defaultMsg, obj);
            };

            /**
             * Error message HTML, here's the default
             * @param message
             * @returns {string}
             */
            var errorHTML = function (message) {
                return '<p class="error">' + message + '</p>';
            };


            /**
             * Success message HTML, here's the default
             * @param message
             * @returns {string}
             */
            var successHTML = function (message) {
                return '<p class="success">' + message + '</p>';
            };


            /**
             * $get
             * @returns {{valid: {}, defaultMsg: {required: {error: string, success: string}, url: {error: string, success: string}}, errorHTML: Function, successHTML: Function}}
             */
            this.$get = function () {
                return {
                    valid: valid,
                    defaultMsg: defaultMsg,
                    errorHTML: errorHTML,
                    successHTML: successHTML,
                    setupDefaultMsg: setupDefaultMsg
                }
            };


        });
}).call(this);

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