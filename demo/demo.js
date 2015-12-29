(function() {
  angular.module('myApp', ['validation', 'validation.rule', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ui.select', 'ngSanitize'])

  // -------------------
  // config phase
  // -------------------
  .config(['$validationProvider', function($validationProvider) {
    var defaultMsg;
    var expression;

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
    $validationProvider.setDefaultMsg({
        ip: {
          error: 'This no ip',
          success: 'this ip'
        }
      })
      .setExpression({
        ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      });

    /**
     * Additions validation
     */
    $validationProvider
      .setExpression({
        huei: function(value, scope, element, attrs) {
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
        range: function(value, scope, element, attrs) {
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
  .controller('index', ['$scope', '$injector', function($scope, $injector) {
    // Injector

    var $validationProvider = $injector.get('$validation');

    // Initial Value
    $scope.form = {
      requiredCallback: 'required',
      checkValid: $validationProvider.checkValid,
      submit: function() {
        // angular validation 1.2 can reduce this procedure, just focus on your action
        // $validationProvider.validate(form);
      },
      reset: function() {
        // angular validation 1.2 can reduce this procedure, just focus on your action
        // $validationProvider.reset(form);
      }
    };

    $scope.form2 = {
      checkValid: $validationProvider.checkValid,
      submit: function(form) {
        $validationProvider.validate(form);
      },
      reset: function(form) {
        $validationProvider.reset(form);
      }
    };

    $scope.form3 = {
      checkValid: $validationProvider.checkValid,
      submit: function(form) {
        $validationProvider.validate(form)
          .success($scope.success)
          .error($scope.error);
      },
      reset: function(form) {
        $validationProvider.reset(form);
      }
    };

    $scope.form4 = {
      changeErrorMsg: 'This is the First Error Msg',
      changeMsg: function() {
        $scope.form4.changeErrorMsg = 'This is the Second Error Msg';
      }
    };

    $scope.form5 = {
      checkValid: $validationProvider.checkValid,
      submit: function(form) {
        $validationProvider.validate(form);
      },
      reset: function(form) {
        $validationProvider.reset(form);
      }
    };

    $scope.form6 = {
      required: [{}, {}, {}], // ng-repeat
      checkValid: $validationProvider.checkValid
    };

    // Bootstrap Datepicker
    $scope.form7 = {
      dt: new Date(),
      open: function($event) {
        $scope.form7.status.opened = true;
      },
      dateOptions: {
        formatYear: 'yy',
        startingDay: 1
      },
      status: {
        opened: false
      }
    };

    $scope.form8 = {
      country: {},
      countries: [ // Taken from https://gist.github.com/unceus/6501985
        {
          name: 'Åland Islands',
          code: 'AX'
        }, {
          name: 'Albania',
          code: 'AL'
        }, {
          name: 'Algeria',
          code: 'DZ'
        }, {
          name: 'American Samoa',
          code: 'AS'
        }, {
          name: 'Antigua and Barbuda',
          code: 'AG'
        }, {
          name: 'Argentina',
          code: 'AR'
        }, {
          name: 'Bahamas',
          code: 'BS'
        }, {
          name: 'Bahrain',
          code: 'BH'
        }, {
          name: 'Bangladesh',
          code: 'BD'
        }, {
          name: 'Barbados',
          code: 'BB'
        }, {
          name: 'British Indian Ocean Territory',
          code: 'IO'
        }, {
          name: 'Brunei Darussalam',
          code: 'BN'
        }, {
          name: 'Bulgaria',
          code: 'BG'
        }, {
          name: 'Burkina Faso',
          code: 'BF'
        }, {
          name: 'Burundi',
          code: 'BI'
        }, {
          name: 'Cambodia',
          code: 'KH'
        }, {
          name: 'Cameroon',
          code: 'CM'
        }, {
          name: 'Canada',
          code: 'CA'
        }, {
          name: 'Czech Republic',
          code: 'CZ'
        }, {
          name: 'Denmark',
          code: 'DK'
        }, {
          name: 'Ethiopia',
          code: 'ET'
        }, {
          name: 'Falkland Islands (Malvinas)',
          code: 'FK'
        }, {
          name: 'Faroe Islands',
          code: 'FO'
        }, {
          name: 'Fiji',
          code: 'FJ'
        }, {
          name: 'Finland',
          code: 'FI'
        }, {
          name: 'France',
          code: 'FR'
        }, {
          name: 'Georgia',
          code: 'GE'
        }, {
          name: 'Germany',
          code: 'DE'
        }, {
          name: 'Hong Kong',
          code: 'HK'
        }, {
          name: 'Iceland',
          code: 'IS'
        }, {
          name: 'India',
          code: 'IN'
        }, {
          name: 'Indonesia',
          code: 'ID'
        }, {
          name: 'Iran, Islamic Republic Of',
          code: 'IR'
        }, {
          name: 'Iraq',
          code: 'IQ'
        }, {
          name: 'Ireland',
          code: 'IE'
        }, {
          name: 'Israel',
          code: 'IL'
        }, {
          name: 'Italy',
          code: 'IT'
        }, {
          name: 'Jamaica',
          code: 'JM'
        }, {
          name: 'Japan',
          code: 'JP'
        }, {
          name: 'Jersey',
          code: 'JE'
        }, {
          name: 'Jordan',
          code: 'JO'
        }, {
          name: 'Kiribati',
          code: 'KI'
        }, {
          name: 'Korea, Democratic People\'s Republic of',
          code: 'KP'
        }, {
          name: 'Korea, Republic of',
          code: 'KR'
        }, {
          name: 'Kuwait',
          code: 'KW'
        }, {
          name: 'Liberia',
          code: 'LR'
        }, {
          name: 'Libyan Arab Jamahiriya',
          code: 'LY'
        }, {
          name: 'Malaysia',
          code: 'MY'
        }, {
          name: 'Mexico',
          code: 'MX'
        }, {
          name: 'Micronesia, Federated States of',
          code: 'FM'
        }, {
          name: 'Moldova, Republic of',
          code: 'MD'
        }, {
          name: 'Norfolk Island',
          code: 'NF'
        }, {
          name: 'Northern Mariana Islands',
          code: 'MP'
        }, {
          name: 'Norway',
          code: 'NO'
        }, {
          name: 'Oman',
          code: 'OM'
        }, {
          name: 'Pakistan',
          code: 'PK'
        }, {
          name: 'Palau',
          code: 'PW'
        }, {
          name: 'Portugal',
          code: 'PT'
        }, {
          name: 'Puerto Rico',
          code: 'PR'
        }, {
          name: 'Qatar',
          code: 'QA'
        }, {
          name: 'Reunion',
          code: 'RE'
        }, {
          name: 'Romania',
          code: 'RO'
        }, {
          name: 'Russian Federation',
          code: 'RU'
        }, {
          name: 'South Africa',
          code: 'ZA'
        }, {
          name: 'Sweden',
          code: 'SE'
        }, {
          name: 'Tajikistan',
          code: 'TJ'
        }, {
          name: 'Thailand',
          code: 'TH'
        }, {
          name: 'Tunisia',
          code: 'TN'
        }, {
          name: 'Turkey',
          code: 'TR'
        }, {
          name: 'Tuvalu',
          code: 'TV'
        }, {
          name: 'Uganda',
          code: 'UG'
        }, {
          name: 'Ukraine',
          code: 'UA'
        }, {
          name: 'United Arab Emirates',
          code: 'AE'
        }, {
          name: 'United Kingdom',
          code: 'GB'
        }, {
          name: 'United States',
          code: 'US'
        }, {
          name: 'Vietnam',
          code: 'VN'
        }, {
          name: 'Yemen',
          code: 'YE'
        }, {
          name: 'Zambia',
          code: 'ZM'
        }, {
          name: 'Zimbabwe',
          code: 'ZW'
        }
      ],
      disable: function() {
        $scope.form8.disabled = true;
      },
      enable: function() {
        $scope.form8.disabled = false;
      },
      clear: function() {
        $scope.form8.country.selected = undefined;
      }
    };

    // Callback method
    $scope.success = function(message) {
      alert('Success ' + message);
    };

    $scope.error = function(message) {
      alert('Error ' + message);
    };
  }]);
}).call(this);
