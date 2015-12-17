angular-validation 1.3.4
=========================
[![NPM version](https://badge.fury.io/js/angular-validation.svg)](http://badge.fury.io/js/angular-validation)
[![Build Status](https://travis-ci.org/huei90/angular-validation.png?branch=master)](https://travis-ci.org/huei90/angular-validation)
[![Code Climate](https://codeclimate.com/github/huei90/angular-validation/badges/gpa.svg)](https://codeclimate.com/github/huei90/angular-validation)
[![devDependency Status](https://david-dm.org/huei90/angular-validation/dev-status.png)](https://david-dm.org/huei90/angular-validation#info=devDependencies)
[![Gitter chat](https://badges.gitter.im/huei90/angular-validation.png)](https://gitter.im/huei90/angular-validation)

Client-side Validation should be simple and clean.
<br/>Don't let Client-side Validation dirty your controller.

Setup your Validation on config phase by using some rules [(example)](https://github.com/huei90/angular-validation/blob/master/dist/angular-validation-rule.js)
<br/>If you prefer schema over html attributes , try [angular-validation-schema
](https://github.com/thetutlage/angular-validation-schema) [(Demo)](http://plnkr.co/edit/X56HEsDYgYoY8gbSj7cu?p=preview)
<br/>And add Validation in your view only.

angularjs 1.2.x support to version [angular-validation 1.2.x](https://github.com/huei90/angular-validation/tree/v1.2.x) <br/>
angularjs 1.3.x support after version angular-validation 1.3.x

Requirement
-----
[AngularJS](http://angularjs.org) 1.2.x (for [angular-validation 1.2.x](https://github.com/huei90/angular-validation/tree/v1.2.x)) <br/>
[AngularJS](http://angularjs.org) 1.3.x (for [angular-validation 1.3.x](https://github.com/huei90/angular-validation/tree/master))

DEMO
-----
http://huei90.github.io/angular-validation/

http://plnkr.co/edit/rjIIkX (Bootstrap framework)

License
-----
MIT

Install
-----
Install with npm

```
npm install angular-validation
```

or with bower

```
bower install angular-validation
```

Using angular-validation
---
```html
<script src="dist/angular-validation.js"></script>
<script src="dist/angular-validation-rule.js"></script>
```
Using angular-validation with bower
---
```html
<script src="lib/angular-validation/dist/angular-validation.js"></script>
<script src="lib/angular-validation/dist/angular-validation-rule.js"></script>
```
```js
angular.module('yourApp', ['validation']);

// including your validation rule
angular.module('yourApp', ['validation', 'validation.rule']);
```

Writing your First Code
====
```html
<form name="Form">
    <div class="row">
        <div>
            <label>Required</label>
            <input type="text" name="required" ng-model="form.required" validator="required">
        </div>
        <div>
            <label>Url</label>
            <input type="text" name="url" ng-model="form.url" validator="required, url">
        </div>
        <button validation-submit="Form" ng-click="next()">Submit</button>
        <button validation-reset="Form">Reset</button>
    </div>
</form>
```

[Documentation API](https://github.com/huei90/angular-validation/blob/master/API.md)

Built-in validation <small>in angular-validation-rule</small>
===

1. Required
2. Url
3. Email
4. Number
5. Min length
6. Max length

5 and 6 require you to pass an inline parameter to set the length limit. Eg, `maxlength=6`.

Anyone can give a `PR` for this angular-validation for more `built-in validation`


Integrating with Twitter Bootstrap
=====

To integrate this package with Bootstrap you should do the following.


Add the following LESS to your project

```css
.ng-invalid.ng-dirty{
    .has-error .form-control;
}

label.has-error.control-label {
    .has-error .control-label;
}

```

Change the Error HTML to something like:

```javascript
$validationProvider.setErrorHTML(function (msg) {
       return  "<label class=\"control-label has-error\">" + msg + "</label>";
});
```

You can add the bootstrap class `.has-success` in a similar fashion.

To toggle `.has-error` class on bootstrap `.form-group` wrapper for labels and controls, add:

```javascript
angular.extend($validationProvider, {
    validCallback: function (element){
        $(element).parents('.form-group:first').removeClass('has-error');
    },
    invalidCallback: function (element) {
        $(element).parents('.form-group:first').addClass('has-error');
    }
});
```

CHANGELOG
=====
See [release](https://github.com/huei90/angular-validation/releases)

CONTRIBUTORS
=====
Thanks for all [contributors](https://github.com/huei90/angular-validation/graphs/contributors)
