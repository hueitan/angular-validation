angular.module('myApp', ['validation'])

    .controller('index', ['$scope', '$injector', function ($scope, $injector) {

        // Injector
        var $validationProvider = $injector.get('$validation'),
            expression,
            defaultMsg;


        // Initial Value
        $scope.form = {
            requiredCallback: 'required',
            checkValid: $validationProvider.checkValid,
            submit: function (form) {
                $validationProvider.validate($scope, form);
            },
            reset: function (form) {
                $validationProvider.reset($scope, form);
            }
        };

        $scope.form2 = {
            checkValid: $validationProvider.checkValid,
            submit: function (form) {
                $validationProvider.validate($scope, form);
            },
            reset: function (form) {
                $validationProvider.reset($scope, form);
            }
        };

        $scope.form3 = {
            checkValid: $validationProvider.checkValid,
            submit: function (form) {
                $validationProvider.validate($scope, form)
                    .success($scope.success)
                    .error($scope.error);
            },
            reset: function (form) {
                $validationProvider.reset($scope, form);
            }
        };

        $scope.form4 = {
            changeErrorMsg: 'This is the First Error Msg',
            changeMsg: function () {
                $scope.form4.changeErrorMsg = 'This is the Second Error Msg';
            }
        };

        // Callback method
        $scope.success = function (message) {
            alert('Success ' + message);
        };

        $scope.error = function (message) {
            alert('Error ' + message);
        };


        /**
         * Setup a default message for Url
         */
        defaultMsg = {
            url: {
                error: 'This is a error url given by user',
                success: 'It\'s Url'
            }
        };

        $validationProvider.setDefaultMsg(defaultMsg);


        /**
         * Setup a new Expression and default message
         * In this example, we setup a IP address Expression and default Message
         */
        expression = {
            ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        };

        defaultMsg = {
            ip: {
                error: 'This isn\'t ip address',
                success: 'It\'s ip'
            }
        };

        $validationProvider.setExpression(expression);
        $validationProvider.setDefaultMsg(defaultMsg);

        // or we can just setup directly
        $validationProvider.setDefaultMsg({ ip: { error: 'This no ip', success: 'this ip'}});
        $validationProvider.setExpression({ ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ });

        /**
         * Additions validation
         */
        $validationProvider.setExpression({
            /**
             * @param value , user input
             * @returns {boolean} true iff valid
             */
            huei: function (value) {
                return value === 'Huei Tan';
            }
        });

        $validationProvider.setDefaultMsg({
            huei: {
                error: 'This should be Huei Tan',
                success: 'Thanks!'
            }
        });

    }]);
