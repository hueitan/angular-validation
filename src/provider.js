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
             * Override the errorHTML function
             * @param func
             */
            var setupErrorHTML = function (func) {
                if (func.constructor !== Function) {
                    return;
                }

                this.errorHTML = func;
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
             * Override the successHTML function
             * @param func
             */
            var setupSuccessHTML = function (func) {
                if (func.constructor !== Function) {
                    return;
                }

                this.successHTML = func;
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
             * checkValid(Form): Check the specific form(Form) valid from angular `$valid`
             * @param form
             * @returns {boolean}
             */
            var checkValid = function (form) {
                if (form.$valid === undefined) {
                    return false;
                }
                return (form && form.$valid === true);
            };


            /**
             * Validate the form when click submit, when `validMethod = submit`
             * @param scope
             * @param form
             * @returns {promise|*}
             */
            var validate = function (scope, form) {

                for (var k in form) {
                    if (form[k].hasOwnProperty('$dirty')) {
                        scope.$broadcast(k + 'submit');
                    }
                }

                var deferred = $q.defer();
                deferred.promise.success = function (fn) {
                    deferred.promise.then(function (value) {
                        fn(value);
                    });
                    return deferred.promise;
                };

                deferred.promise.error = function (fn) {
                    deferred.promise.then(null, function (value) {
                        fn(value);
                    });
                    return deferred.promise;
                };

                if (checkValid(form)) {
                    deferred.resolve('success');
                }
                else {
                    deferred.reject('error');
                }

                return deferred.promise;
            };


            /**
             * reset the specific form
             * @param scope
             * @param form
             */
            var reset = function (scope, form) {
                for (var k in form) {
                    if (form[k].hasOwnProperty('$dirty')) {
                        form[k].$setViewValue(null);
                        form[k].$setPristine();
                        form[k].$setValidity(form[k].$name, false);
                        form[k].$render();
                        scope.$broadcast(k + 'reset');
                    }
                }
            };


            /**
             * $get
             * @returns {{errorHTML: Function, successHTML: Function, setupExpression: Function, getExpression: Function, setupDefaultMsg: Function, getDefaultMsg: Function, checkValid: Function, reset: Function}}
             */
            this.$get = function ($injector) {
                setup($injector);
                return {
                    setupErrorHTML: setupErrorHTML,
                    errorHTML: errorHTML,
                    setupSuccessHTML: setupSuccessHTML,
                    successHTML: successHTML,
                    setupExpression: setupExpression,
                    getExpression: getExpression,
                    setupDefaultMsg: setupDefaultMsg,
                    getDefaultMsg: getDefaultMsg,
                    checkValid: checkValid,
                    validate: validate,
                    reset: reset
                };
            };

        });
}).call(this);