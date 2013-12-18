(function () {
    angular.module('validation.provider', [])
        .provider('$validation', function () {

            /**
             * true if the form is true, else false
             * @type {{}}
             */
            var valid = {};



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
                    expression: expression,
                    defaultMsg: defaultMsg,
                    errorHTML: errorHTML,
                    successHTML: successHTML,
                    setupExpression: setupExpression,
                    setupDefaultMsg: setupDefaultMsg
                }
            };


        });
}).call(this);