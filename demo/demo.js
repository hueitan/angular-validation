
angular.module('myApp', ['validation']);

function validation($scope, $injector) {

    var validationProvider = $injector.get('validationProvider');

    $scope.form = {
        requiredCallback: 'required'
    };

    $scope.error = function (message) {
        alert('Error ' + message)
    };

    /**
     *
     * @type {{url: {error: string, success: string}}}
     */
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
