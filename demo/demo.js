(function () {
    angular.module('myApp', ['validation', 'validation.rule'])
        // -------------------
        // config phase
        // -------------------
        .config(['$validationProvider', function ($validationProvider) {
            var defaultMsg;
            /**
             * Setup a default message for Url
             */
            defaultMsg = {
                url: {
                    error: 'שדה לא תקין',
                    success: ''
                }
            };
            $validationProvider.setDefaultMsg(defaultMsg);
            $validationProvider.showSuccessMessage = false;
        }])
        .controller('index', ['$scope', '$injector', function ($scope, $injector) {
            // Injector
            var $validationProvider = $injector.get('$validation');
            $scope.form6 = {
                required: [{}, {}, {}], // ng-repeat
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
