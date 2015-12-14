API
===
### **Add Valid Message (error, success) for validation `required`** <br/>
`required-error-message` and `required-success-message`

```html
<label>Required</label>
<input type="text"
       name="require"
       ng-model="form.required"
       validator="required"
       required-error-message="Required"
       required-success-message="Good Required"/>
       <!-- or you can try
       required-error-message="{{ RequiredMsg }}"
       -->
```

### **Add Valid Message (error, success) for validation `email`** <br/>
`email-error-message` and `email-success-message`

```html
<label>Email</label>
<input type="text"
       name="email"
       ng-model="form.email"
       validator="email"
       email-error-message="Error Email"
       email-success-message="Good Email"/>
```

### **Use Default Valid Message** <br/>
*You don't need to give valid message* - the valid/invalid message will be automatically placed next to your input element.

```html
<label>Number</label>
<input type="text" name="number" ng-model="form.number" validator="number"/>
```

### **Use a custom Valid Message** <br/>
You can also add a custom validation message by using `message-id` attribute. It allows you to place a valid/invalid message wherever you want, a target element must specify an `id` attribute that matches with a value of the `message-id`.

```html
<label>Number</label>
<input type="text" name="number" ng-model="form.number" validator="number" message-id="message"/>
<span id="message"></span>
```

<a name="no-validation-message"></a>
### **Don't show the Valid Message `no-validation-message="true"`**

```html
<label>Number</label>
<input type="text" name="number" ng-model="form.number" validator="number" no-validation-message="true"/>
<!-- or {{ your.Scope.Name }} -->
<input type="text" name="number" ng-model="form.number" validator="number" no-validation-message="{{ noValidationMessage }}"/>
```

### **Add Valid Callback Function, `invalid-callback` & `valid-callback`**

```html
<label>Required (Invalid Callback alert)</label>
<input type="text" name="requiredCallback" ng-model="form.requiredCallback" validator="required" invalid-callback='error("Must be Required");'/>
```

### **Select the validation method `watch` `blur` `submit` `submit-only`, default as `watch`** <br/>
`validationProvider.validate(form).success(callback).error(callback)` use callback to continue your submit

```html
<label>Watch method</label>
<input type="text" name="number" ng-model="form.number" validator="number" valid-method="watch"/>
<input type="text" name="number" ng-model="form.number" validator="number"/>

<label>Blur method</label>
<input type="text" name="number" ng-model="form.number" validator="number" valid-method="blur"/>
<!-- or try ng-model-options="{ updateOn: 'blur' }" -->
<input type="text" name="number" ng-model="form.number" validator="number" ng-model-options="{ updateOn: 'blur' }"/>

<label>Submit method</label>
<form name="Form">
    <input type="text" name="number" ng-model="form.number" validator="number" valid-method="submit"/>
    <button ng-click="form.submit(Form)"></button>
</form>

<label>Submit Only method</label>
<form name="Form">
    <input type="text" name="number" ng-model="form.number" validator="number" valid-method="submit-only"/>
    <button ng-click="form.submit(Form)"></button>
</form>

<script>
    // ... validate method, it will check `checkValid(Form)`
    $scope.form = {
        submit: function (form) {
            $validationProvider.validate(form)
                .success(successCallback)
                .error(errorCallback);
        }
    };
    // ...
</script>

<!-- In angular validation 1.2.0
     More easy, more clean in your js code -->

<form name="Form">
    <input type="text" name="number" ng-model="form.number" validator="number" valid-method="submit-only"/>
    <button validation-submit="Form" ng-click="form.submit()"></button>
</form>

<script>
    // Don't need include $validationProvider.validate() anymore
    $scope.form = {
        submit: function () {
            // your ng-click success callback
        }
    };
</script>

<!-- Clean, right ? -->
```

### **Select a global validation method** `watch blur submit submit-only`**

`validationProvider.setValidMethod('submit')`

### **Setup a new Validation `setExpression()` `setDefaultMsg()` with `RegExp` or `Function` in config phase**
<a name="custom-function-huei"></a>

```html
<!-- View -->
<label>IP address (Custom setup the new validator - RegExp)</label>
<input type="text" name="ip" ng-model="form.ip" validator="ip"/>

<label>Huei (Custom setup the new validator - Function)</label>
<input type="text" name="huei" ng-model="form.huei" validator="huei"/>
```

```javascript
// your module
angular.module('yourApp', ['validation'])
    .config(['$validationProvider', function ($validationProvider) {
        // Setup `ip` validation
        var expression = {
            ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        };

        var validMsg = {
            ip: {
                error: 'This isn\'t ip address',
                success: 'It\'s ip'
            }
        };

        $validationProvider.setExpression(expression) // set expression
                          .setDefaultMsg(validMsg); // set valid message

        // Setup `huei` validation
        $validationProvider
            .setExpression({
                huei: function (value, scope, element, attrs) {
                    return value === 'Huei Tan';
                    // or you can do
                    return $q.all([obj]).then(function () {
                    // ...
                        return true;
                    })
                }
            })
            .setDefaultMsg({
                huei: {
                    error: 'This should be Huei Tan',
                    success: 'Thanks!'
                }
            });
    }]);
```

### **Check form whether valid, return `true` if valid. `checkValid()`** <br/>
### **Reset the specific Form. `reset()`**

```html
<form name="Form">
    ...
    <!-- Check the entire form valid from angular-validation `valid` -->
    <button ng-disabled="form.checkValid()"></button>
    <!-- or Check the specific form(Form) valid from angular `$valid` -->
    <button ng-disabled="form.checkValid(Form)"></button>
    <!-- Reset the specific Form -->
    <button ng-click="form.reset(Form)"></button>
    <!-- Clean Reset (angular validation 1.2.0) -->
    <button validation-reset="Form"></button>
</form>
```

```javascript
    // ... checkValid
    $scope.form.checkValid = validationProvider.checkValid;
    // ... reset
    $scope.form.reset = function (form) {
        validationProvider.reset(form);
    };
    // ... angular validation 1.2.0 reset
    $scope.form.reset = function () {
        // Don't need include validationProvider.reset();
        // Focus on your ng-click action
    };
```

### **Set the valid/invalid message style CSS**

```html
<span><p class="validation-valid">Your valid message here<p></span>
<span><p class="validation-invalid">Your invalid message here<p></span>
```

```css
.validation-valid {
    <!-- valid style -->
}

.validation-invalid {
    <!-- invalid style -->
}
```

### **Custom the valid/invalid message style HTML in `.config()`,** <br/>
`setErrorHTML(func)` `setSuccessHTML(func)`, input should be a `function` and given `parameter` which is the valid/invalid message declared
in `getDefaultMsg()`,and finally return the HTML code

```javascript
// your angular
.config(['$validationProvider', function ($validationProvider) {
    $validationProvider.setErrorHTML(function (msg) {
        // remember to return your HTML
        // eg: return '<p class="invalid">' + msg + '</p>';
    });

    $validationProvider.setSuccessHTML(function (msg) {
        // eg: return '<p class="valid">' + msg + '</p>';
    });
}]);
```

### **disable/enable show success/error message**<br/>
`default: true`<br/>
Easily disable success/error message

```javascript
// your angular
.config(['$validationProvider', function ($validationProvider) {
    $validationProvider.showSuccessMessage = false; // or true(default)
    $validationProvider.showErrorMessage = false; // or true(default)
}]);
```

### **Multiple validators**<br/>
Use commas to separate multiple validators.

```html
<input type="text" validator="required, url" name="url" ng-model="form.url"/>
```

### **Validator parameters**<br/>
The built in `maxlength` and `minlength` validators use parameters to configure the limits. For example:

```html
<input type="text" name="username" ng-model="form.username" validator="maxlength=6"/>
```

You can use parameters in your custom validators in the same way. 
You can access this parameter in the validation expression like so:

```html
<input type="text" name="code" ng-model="form.code" validator="isstring=test"/>
```

```javascript
// your module
angular.module('yourApp', ['validation'])
    .config(['$validationProvider', function ($validationProvider) {
        // Setup `isstring` validation
        $validationProvider
            .setExpression({
                isstring: function (value, scope, element, attrs, param) {
                    return value === param;
                }
            })
            .setDefaultMsg({
                isstring: {
                    error: 'This is not what we wanted!',
                    success: 'Thanks!'
                }
            });
    }]);
```

### **Customizable Initial Validation**<br/>
Intial Validation for the input false. You can make it to true!

```html
<!-- default false -->
<input type="text" name="firstName" ng-model="firstName" validator="required"/>

<!-- set to true -->
<input type="text" name="firstName" ng-model="firstName" validator="required" initial-validity="true"/>
```

### Custom Error/Success Message Function
#### html
Declare your valid and invalid callback functions. Make sure to pass the `message` param.
``` html
<input type="text" ng-model="name" name="inputName" validator="required" valid-callback="validationValidHandler(message)" invalid-callback="validationInvalidHandler(message)">
```
#### Javascript
Now you can call your own function and have access to the message.
``` javascript
scope.validationValidHandler = function(message){
  // you now have access to the error message
  displayMessage(message, 'success');
};

scope.validationInvalidHandler = function(message){
  // you now have access to the error message
  displayMessage(message, 'error');
};
```


### **Setup a global valid/invalid/reset callback in config phase**

```javascript
// your module
angular.module('yourApp', ['validation'])
    .config(['$validationProvider', function ($validationProvider) {        
		validationProvider.validCallback = function(element) {
			$(element).parents('.validator-container:first').removeClass('has-error').addClass('has-success-tick');
		};
		validationProvider.invalidCallback = function(element) {
			$(element).parents('.validator-container:first').removeClass('has-success-tick').addClass('has-error');
		};
		validationProvider.resetCallback = function(element) {
			$(element).parents('.validator-container:first').removeClass('has-error');
		};
    }]);
```


