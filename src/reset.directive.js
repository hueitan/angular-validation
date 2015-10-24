(function() {
  angular
    .module('validation.directive')
    .directive('validationReset', Reset);

  function Reset($injector) {
    var $validationProvider = $injector.get('$validation');
    var $timeout = $injector.get('$timeout');
    var $parse = $injector.get('$parse');
    return {
      link: function postLink(scope, element, attrs) {
        var form = $parse(attrs.validationReset)(scope);
        $timeout(function() {
          element.on('click', function(e) {
            e.preventDefault();
            $validationProvider.reset(form);
          });
        });
      }
    };
  }
  Reset.$inject = ['$injector'];
}).call(this);
