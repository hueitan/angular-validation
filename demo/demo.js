angular.module('myApp', ['validation'])

    .controller('index', ['$scope', '$injector', function ($scope, $injector) {

        // Injector
        var $validationProvider = $injector.get('$validation'),
            expression = {},
            defaultMsg = {};


        // Initial Value
        $scope.form = {
            requiredCallback: 'required',
            checkValid: $validationProvider.checkValid,
            reset: $validationProvider.reset
        };

        $scope.form2 = {
            checkValid: $validationProvider.checkValid,
            reset: $validationProvider.reset
        };

        $scope.form3 = {
            submit: function () {
                $validationProvider.submit($scope)
            },
            reset: $validationProvider.reset
        };

        // Callback method
        $scope.error = function (message) {
            alert('Error ' + message)
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

        $validationProvider.setupDefaultMsg(defaultMsg);


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

        $validationProvider.setupExpression(expression);
        $validationProvider.setupDefaultMsg(defaultMsg);

        // or we can just setup directly
        $validationProvider.setupDefaultMsg({ ip: { error: 'This no ip', success: 'this ip'}});
        $validationProvider.setupExpression({ ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ });

    }]);
