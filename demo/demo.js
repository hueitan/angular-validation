
angular.module('myApp', ['validation']);

function validation($scope, $injector) {

    // Injector
    var validationProvider = $injector.get('validationProvider');

    // Initial Value
    $scope.form = {
        requiredCallback: 'required'
    };

    $scope.error = function (message) {
        alert('Error ' + message)
    };

    // Give Default Message
    var defaultMsg = {
        url: {
            error: 'This is a error url given by user',
            success: 'It\'s Url'
        }
    };

    /**
     * Setup custom validation message
     */
    validationProvider.setupDefaultMsg(defaultMsg);

}
