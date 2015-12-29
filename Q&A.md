Q & A
=====
###Can I validate multiple Checkbox?

Yes, you can do it by using `validation-group`

```html
<div class="row">
    <div class="checkbox">
        <label for="checkbox1">
            <input id="checkbox1" type="checkbox" name="checkBlur1" ng-model="form5.check1" validator="required" validation-group="checkBlur"/>
            Checkbox 1
        </label>
    </div>
    <div class="checkbox">
        <label for="checkbox2">
            <input id="checkbox2" type="checkbox" name="checkBlur2" ng-model="form5.check2" validator="required" validation-group="checkBlur"/>
            Checkbox 2
        </label>
    </div>
</div>
<span id="checkBlur"></span>
```

###Can I validate the form when init ? [#10](https://github.com/huei90/angular-validation/issues/10)###

```html
<form name="Form">
    <input type="text" name="number" ng-model="form.number" validator="number"/>
    <button id="button1111" ng-click="form.submit(Form)">Show</button>
</form>
```
```javascript
$timeout(function () { // call $timeout to make sure the Form Constructor is generated
    $validationProvider.validate($scope.Form); // $scope.Form is html form name `Form Constructor`
});
```

###What's the differentiate between validator-method `submit` and `submit-only`[#4](https://github.com/huei90/angular-validation/issues/4)###

`submit` : when user click submit, then start watching using `watch` to validate<br/>
`submit-only` : when user click `submit`, doesn't validate through `watch` until `submit` button is clicked.

###Use checkValid() manually [#19](https://github.com/huei90/angular-validation/issues/19)###

Before using `checkValid()`, you have to execute `submit` first to get the latest result.

###How do we do tooltips for error messages upon focusing? [#68](https://github.com/huei90/angular-validation/issues/68#issuecomment-86445467)

Using `validCallback` and `invalidCallback` to implement

###Can this works correctly with AngularUI, ui-select, others ... ?###

Yes, `angular-validation` works perfectly with other directive. (isolation scope). Find out more from the demo page.
