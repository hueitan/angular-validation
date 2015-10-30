(function() {
  angular
    .module('validation.directive')
    .directive('validationSubmit', Submit);

  function Submit($injector) {
    var $validationProvider = $injector.get('$validation');
    var $timeout = $injector.get('$timeout');
    var $parse = $injector.get('$parse');
    return {
      priority: 1, // execute before ng-click (0)
      require: '?ngClick',
      link: function postLink(scope, element, attrs) {
        var form = $parse(attrs.validationSubmit)(scope);
        $timeout(function() {
          // Disable ng-click event propagation
          element.off('click');
          element.on('click', function(e) {
            e.preventDefault();
            $validationProvider.validate(form)
              .success(function() {
                $parse(attrs.ngClick)(scope);
              });
          });
        });
      }
    };
  }
  Submit.$inject = ['$injector'];
}).call(this);
