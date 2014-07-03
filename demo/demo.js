(function () {
    angular.module('myApp', ['validation', 'validation.rule'])

        // -------------------
        // config phase
        // -------------------
        .config(['$validationProvider', function ($validationProvider) {

            var defaultMsg,
                expression;

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

            $validationProvider.setExpression(expression)
                               .setDefaultMsg(defaultMsg);

            // or we can just setup directly
            $validationProvider.setDefaultMsg({ ip: { error: 'This no ip', success: 'this ip'}})
                               .setExpression({ ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ });

            /**
             * Additions validation
             */
            $validationProvider
                .setExpression({
                    huei: function (value, scope, element, attrs) {
                        return value === 'Huei Tan';
                    }
                })
                .setDefaultMsg({
                    huei: {
                        error: 'This should be Huei Tan',
                        success: 'Thanks!'
                    }
                });

            /**
             * Range Validation
             */
            $validationProvider
                .setExpression({
                    range: function (value, scope, element, attrs) {
                        if (value >= parseInt(attrs.min) && value <= parseInt(attrs.max)) {
                            return value;
                        }
                    }
                })
                .setDefaultMsg({
                    range: {
                        error: 'Number should between 5 ~ 10',
                        success: 'good'
                    }
                });
        }])

        // -------------------
        // controller phase
        // -------------------
        .controller('index', ['$scope', '$injector', function ($scope, $injector) {

            // Injector
            var $validationProvider = $injector.get('$validation');


            // Initial Value
            $scope.form = {
                requiredCallback: 'required',
                checkValid: $validationProvider.checkValid,
                submit: function () {
                    // angular validation 1.2 can reduce this procedure, just focus on your action
                    // $validationProvider.validate(form);
                },
                reset: function () {
                    // angular validation 1.2 can reduce this procedure, just focus on your action
                    // $validationProvider.reset(form);
                }
            };

            $scope.form2 = {
                checkValid: $validationProvider.checkValid,
                submit: function (form) {
                    $validationProvider.validate(form);
                },
                reset: function (form) {
                    $validationProvider.reset(form);
                }
            };

            $scope.form3 = {
                checkValid: $validationProvider.checkValid,
                submit: function (form) {
                    $validationProvider.validate(form)
                        .success($scope.success)
                        .error($scope.error);
                },
                reset: function (form) {
                    $validationProvider.reset(form);
                }
            };

            $scope.form4 = {
                changeErrorMsg: 'This is the First Error Msg',
                changeMsg: function () {
                    $scope.form4.changeErrorMsg = 'This is the Second Error Msg';
                }
            };

            $scope.form5 = {
                checkValid: $validationProvider.checkValid,
                submit: function (form) {
                    $validationProvider.validate(form);
                },
                reset: function (form) {
                    $validationProvider.reset(form);
                }
            };

            // Callback method
            $scope.success = function (message) {
                alert('Success ' + message);
            };

            $scope.error = function (message) {
                alert('Error ' + message);
            };
        }]);
}).call(this);
