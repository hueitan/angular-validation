(function() {
  angular
    .module('validation.rule', ['validation'])
    .config(['$validationProvider', function($validationProvider) {
      var expression = {
        required: function(value) {
          return !!value;
        },
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        number: /^\d+$/,
        date: function (value, scope, element, attrs, param) {
          return !value || !/Invalid|NaN/.test(new Date(value).toString());
        },
        dateiso: function (value, scope, element, attrs, param) {
          return !value || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
        },
        length: function (value, scope, element, attrs, param) {
            return value && value.length == param;
        },
        minlength: function(value, scope, element, attrs, param) {
          return value && value.length >= param;
        },
        maxlength: function(value, scope, element, attrs, param) {
          return !value || value.length <= param;
        },
        equality: function (value, scope, element, attrs, param) {
          var paramVal = document.querySelector('input[name=' + param + ']').value
          return value && paramVal && value == paramVal;
        }
      };

      var defaultMsg = {
        required: {
          error: 'This should be Required!!',
          success: 'It\'s Required'
        },
        url: {
          error: 'This should be Url',
          success: 'It\'s Url'
        },
        email: {
          error: 'This should be Email',
          success: 'It\'s Email'
        },
        number: {
          error: 'This should be Number',
          success: 'It\'s Number'
        },
        length: {
          error: "The characters number is incorrect",
          success: "Long enough!"
        },
        minlength: {
          error: 'This should be longer',
          success: 'Long enough!'
        },
        maxlength: {
          error: 'This should be shorter',
          success: 'Short enough!'
        },
        equality: {
          error: "Fields is not equal",
          success: "Fields is equal!"
        },
        date: {
          error: "This is not Date",
          success: "It's Date"
        },
        dateiso: {
          error: "Enter a valid date (ISO)",
          success: "It's date (ISO)"
        }
      };
      $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }]);
}).call(this);
