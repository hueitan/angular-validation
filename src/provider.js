
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