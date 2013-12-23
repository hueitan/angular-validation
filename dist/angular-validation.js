(function () {
    angular.module('validation', ['validation.provider', 'validation.directive']);
}).call(this);
(function () {
    angular.module('validation.provider', [])
        .provider('$validation', function () {


            var $injector,
                $http,
                $q;


            /**
             * Setup the provider
             * @param injector
             */
            var setup = function (injector) {
                $injector = injector;
                $http = $injector.get('$http');
                $q = $injector.get('$q');
            };


            /**
             * broadcast Channel
             * @type {{submit: string}}
             */
            var broadcastChannel = {
                submit: 'submit',
                reset: 'reset'
            };


            /**
             * Define validation type RegExp
             * @type {{required: RegExp, url: RegExp, email: RegExp}}
             */
            var expression = {
                required: /^.+$/,
                url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                number: /^\d+$/
            };


            /**
             * default error, success message
             * @type {{required: {error: string, success: string}, url: {error: string, success: string}, email: {error: string, success: string}, number: {error: string, success: string}}}
             */
            var defaultMsg = {
                required: {
                    error: 'This should be Required!!',
                    success: 'It\'s Required'
                },
                url: {
                    error: 'This should be Url',
                    success: 'It\'s Url'
                },
                email: {
                    error: 'This should be Email',
                    success: 'It\'s Email'
                },
                number: {
                    error: 'This should be Number',
                    success: 'It\'s Number'
                }
            };


            /**
             * Allow user to set a custom Expression, do remember set the default message using setupDefaultMsg
             * @param obj
             */
            var setupExpression = function (obj) {
                angular.extend(expression, obj);
            };


            /**
             * Get the Expression
             * @param exprs
             * @returns {*}
             */
            var getExpression = function (exprs) {
                return expression[exprs];
            };


            /**
             * Allow user to set default message
             * @param obj
             */
            var setupDefaultMsg = function (obj) {
                angular.extend(defaultMsg, obj);
            };


            /**
             * Get the Default Message
             * @param msg
             * @returns {*}
             */
            var getDefaultMsg = function (msg) {
                return defaultMsg[msg];
            };


            /**
             * Invalid message HTML, here's the default
             * @param message
             * @returns {string}
             */
            var errorHTML = function (message) {
                return '<p class="validation-invalid">' + message + '</p>';
            };


            /**
             * Valid message HTML, here's the default
             * @param message
             * @returns {string}
             */
            var successHTML = function (message) {
                return '<p class="validation-valid">' + message + '</p>';
            };


            /**
             * Check form valid, return true
             * checkValid(): Check the entire form valid from angular-validation `valid`
             * checkValid(Form): Check the specific form(Form) valid from angular `$valid`
             * @param form
             * @returns {boolean}
             */
            var checkValid = function (form) {
                return !(form && form.$valid == false);
            };


            /**
             * Check the form when click submit, when `validMethod = submit`
             * @param scope
             * @param form
             * @returns {boolean}
             */
            var submit = function (scope, form) {
                scope.$broadcast(broadcastChannel.submit);

                return checkValid(form);
            };


            /**
             * reset the specific form
             * @param scope
             * @param form
             */
            var reset = function (scope, form) {
                for (var k in form) {
                    if (form[k].$dirty) {
                        form[k].$setViewValue(null);
                        form[k].$setPristine();
                        form[k].$setValidity(form[k].$name, false);
                        form[k].$render();
                    }
                }

                scope.$broadcast(broadcastChannel.reset);
            };


            /**
             * $get
             * @returns {{errorHTML: Function, successHTML: Function, setupExpression: Function, getExpression: Function, setupDefaultMsg: Function, getDefaultMsg: Function, checkValid: Function, reset: Function}}
             */
            this.$get = function ($injector) {
                setup($injector);
                return {
                    errorHTML: errorHTML,
                    successHTML: successHTML,
                    setupExpression: setupExpression,
                    getExpression: getExpression,
                    setupDefaultMsg: setupDefaultMsg,
                    getDefaultMsg: getDefaultMsg,
                    checkValid: checkValid,
                    submit: submit,
                    reset: reset
                }
            };

        });
}).call(this);
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
                    validFunc(element, attrs[successMessage], validation, scope.validCallback(), ctrl);
                } else {
                    invalidFunc(element, attrs[errorMessage], validation, scope.invalidCallback(), ctrl);
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
                                checkValidation(scope, element, attrs, ctrl, validation, value);
                            });

                            scope.$on('reset', function (event) {
                                element.next().html('');
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