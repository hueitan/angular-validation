angular-validation
=========================
[![Build Status](https://travis-ci.org/huei90/angular-validation.png?branch=master)](https://travis-ci.org/huei90/angular-validation)
[![devDependency Status](https://david-dm.org/huei90/angular-validation/dev-status.png)](https://david-dm.org/huei90/angular-validation#info=devDependencies)

Requirement
-----
[AngularJS](http://angularjs.org) > 1.2.4

DEMO
-----
http://huei90.github.io/angular-validation/

Using angular-validation
---
```javascript
angular.module('yourApp', ['validation']);
```

Writing your Code
====
Add Valid Message (error, success) for validation `required` <br/>
`required-error-message` and `required-success-message`
```html
<label>Required</label>
<input type="text"
       name="require"
       ng-model="form.required"
       validator="required"
       required-error-message="Required"
       required-success-message="Good Required"/>
```

Add Valid Message (error, success) for validation `email` <br/>
`email-error-message` and `email-success-message`

```html
<label>Email</label>
<input type="text"
       name="email"
       ng-model="form.email"
       validator="email"
       email-error-message="Error Number"
       email-success-message="Good Email"/>
```

Use Default Valid Message<br/>
*you don't need to give valid message*

```html
<label>Number</label>
<input type="text" name="number" ng-model="form.number" validator="number"/>
```

Add Valid Callback Function, `invalid-callback` & `valid-callback`

```html
<label>Required (Invalid Callback alert)</label>
<input type="text" name="requiredCallback" ng-model="form.requiredCallback" validator="required" invalid-callback='error("Must be Required");'/>
```

Setup a new Validation `setupExpression()` `setupDefaultMsg()`

```html
<!-- View -->
<label>IP address (Custom setup the new validator)</label>
<input type="text" name="ip" ng-model="form.ip" validator="ip"/>
```

```javascript
// Controller

// your module
angular.module('yourApp', ['validation']);

// Now you can use validationProvider in your Angular Controller
function validation($scope, $injector) {

var validationProvider = $injector.get('validationProvider'); // inject validationProvider

var expression = {
    ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
};

var validMsg = {
    ip: {
    error: 'This isn\'t ip address',
    success: 'It\'s ip'
    }
};

validationProvider.setupExpression(expression); // setup expression
validationProvider.setupDefaultMsg(validMsg); // setup valid message

};

```

Check form whether valid, return `true` if valid. `checkValid()`<br/>
Reset the specific Form. `reset()`

```html
<form name="Form">
    ...
    <!-- Check the entire form valid from angular-validation `valid` -->
    <button ng-disabled="form.checkValid()"></button>
    <!-- or Check the specific form(Form) valid from angular `$valid` -->
    <button ng-disabled="form.checkValid(Form)"></button>
    <-- Reset the specific Form -->
    <button ng-click="form.reset(Form)"></button>
</form>
```

```javascript
    // ...
    $scope.form.checkValid = validationProvider.checkValid;
    // ...
    $scope.form.reset = validationProvider.reset;
    // ...
```
Built-in validation <small>in angular-validation</small>
===

1. Required
2. Url
3. Email
4. Number

Anyone can give a `PR` for this angular-validation for more `built-in validation`

Developer <small>Adding a new validation</small>
=====
**Clone the repo to your computer**
```
git clone https://github.com/huei90/angular-validation.git
```

**Download the dependencies**
```
npm install
```

**Before coding** <small>Boot the  Environment</small>
```
grunt dev
```

**Start coding**
```
open `provider.js`, looking for `var expression` and `var defaultMsg`
Adding a new expression and defaultMsg to extend it
```

**IP validation** <small>As the example</small>
```javascript
// provider.js
var expression = {
    required: /.+/gi,
    ... // add new expression below
    ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
};

var defaultMsg = {
    required: {
        error: 'This should be Required!!',
        success: 'It\'s Required'
    },
    ... // add new valid message below
    ip: {
        error: 'This isn\'t ip',
        success: 'It\'s IP'
    }
};
```
**Test**
```
Karma Test done by Travis-ci,
When you are done, test it on `http://localhost:8080`
```

**Give me a PR** <small> Thanks for it </small>
