(function() {
  angular.module('angularValidation').directive('ngTranslateLanguageSelect', function(LocaleService) {
    'use strict';
    return {
      restrict: 'A',
      replace: true,
      template: '<div class="btn-group language-select-container">' +
        '<ui-select ng-model="currentLocaleDisplayName" on-select="changeLanguage(currentLocaleDisplayName)" theme="bootstrap" class="language-select">' +
        '<ui-select-match>{{$select.selected}}</ui-select-match>' +
        '<ui-select-choices repeat="localesDisplayName in localesDisplayNames">' +
        '<div>{{localesDisplayName}}</div>' +
        '</ui-select-choices>' +
        '</ui-select>' +
        '</div>',
      controller: function($scope) {
        $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
        $scope.visible = $scope.localesDisplayNames &&
          $scope.localesDisplayNames.length > 1;

        $scope.changeLanguage = function(locale) {
          LocaleService.setLocaleByDisplayName(locale);
        };
      }
    };
  });
}).call(this);
