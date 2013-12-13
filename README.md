Customizing your Valid Message using angular-validation
=========================
Before
```html
<!-- Provided by Angularjs  -->
<form name="form">
    Email: <input type="email" name="email" ng-model="email" required/>
    <!-- Required Error Message-->
    <span class="error" ng-show="myForm.email.$error.required">Required!</span>
    <!-- Email Format Error Message-->
    <span class="error" ng-show="myForm.email.$error.email">Not valid email!</span>
    <!-- Email Format Valid Message -->
    <span class="success" ng-show="myForm.email.$valid">"{{ email }}" Valid!</span>
    <!-- Overall Form Valid Message -->
    <span class="success" ng-show="myForm.$valid">Form  Valid!</span>
</form>
```
After *(Avoid repeating writing on view)*
```html
<!-- Customize Valid Message on view -->
<label>Required</label>
<input type="text"
       name="require"
       ng-model="form.required"
       validator="required"
       required-error-message="Required"
       required-success-message="Good Required"
       valid-message="Valid"
       invalid-message="Invalid"/>
       
<!-- Use Default Valid Message -->
<label>Required + Url ( Using Default Message )</label>
<input type="text" ng-model="form.requiredUrlDefault" validator="required,url"/>

<!-- You can add valid callback -->
<input type="text" ng-model="form.requiredCallback" validator="required" invalid-callback='error("Must be Required");'/>
```
