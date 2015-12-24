CONTRIBUTING
=====

**Clone the repo to your computer**
```sh
git clone https://github.com/huei90/angular-validation.git
```

**Install Grunt and Download dependencies**
```sh
npm install -g grunt-cli
npm install
```

**Before coding** <small>Boot the  Environment</small>
```sh
grunt dev # developing environment
grunt check # check the code quality
grunt build # build files
```

**Test**
```sh
# Test it locally
npm test
```

Karma Test done by Travis-ci

Adding a new validation
=====

**Start coding**
```
open `rule.js`, looking for `var expression` and `var defaultMsg`
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

When you are done, test it on `http://localhost:8080`

<hr/>

**Give me a PR** <small> Thanks for it </small>

**Who does the exactly same job ?**

1. https://github.com/kelp404/angular-validator
2. https://github.com/nelsonomuto/angular-ui-form-validation
3. (Waiting list..)

**Note**

1. More Status 
       https://github.com/angular/angular.js/issues/583#issuecomment-31277556
2. ngForm module ideas 
       https://docs.google.com/document/d/192dCUnoIBQ7-vurvPeS9BElGdxfk0Ddcof2KzDDi1Mc/edit
3. form-angular
       http://www.forms-angular.org/
4. Html5 form-validation
       http://www.sitepoint.com/client-side-form-validation-html5/
