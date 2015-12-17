17 Dec 2015 v1.3.4 (Moving to v1.4)
===

**Improvement**

[#113](https://github.com/huei90/angular-validation/pull/162) removing directive scope dependency
<br/>[#168](https://github.com/huei90/angular-validation/pull/168) Added a global valid method

**Fix**

[0946ed4](https://github.com/huei90/angular-validation/commit/0946ed4ab22611aaf68b625ac9028a9767f012f7) FIX provider.setSuccess/ErrorMessage & no-validation-message

**Documentation**

[#164](https://github.com/huei90/angular-validation/issues/164) Improve the HTML documentation

31 Oct 2015 v1.3.3
===

**Improvement**

[00ce51c](https://github.com/huei90/angular-validation/commit/00ce51cb85c21a7699c7faecc4a173e0834daadb) Updated `travis.yml`
<br/>[6f9403d](https://github.com/huei90/angular-validation/pull/143) Added the `package.js` in order to support Meteor package
<br/>[a872d4c](https://github.com/huei90/angular-validation/pull/147) Did refactoring the project

**Fix**

[331d2eb](https://github.com/huei90/angular-validation/commit/331d2eb2fd68d11532fe612453861c263577fb58) Wrapped `validation-reset` within $timeout
<br/>[e53469c](https://github.com/huei90/angular-validation/commit/e53469c08a7e6e4ef7c8a60c0e67683bd7dd68ad) Fixed `no-validation-message` condition
<br/>[4dcdb68](https://github.com/huei90/angular-validation/pull/140) Set an actual value from the control's view (ctrl.$viewValue instead of watch value)
<br/>[09aed2e](https://github.com/huei90/angular-validation/pull/145) Fixed an error in the checkValid function


**Documentation**

[eeac2f0](https://github.com/huei90/angular-validation/commit/eeac2f02552621f743899dc2d1bd61194f1977d4) Updated API.md to include an `ng-model-options` example


10 Aug 2015 v1.3.2
===

**Fix**

[fca3399](https://github.com/huei90/angular-validation/pull/117) Trouble focusing on first invalid element on submit
<br/>
[ef425a9](https://github.com/huei90/angular-validation/pull/122) Adding message to invalid and valid callback functions.

**Known Issue**

`$observe` https://github.com/huei90/angular-validation/pull/132

11 May 2015 v1.3.1
===

Welcome [angular-validation-schema](https://github.com/thetutlage/angular-validation-schema)
<br/>Add GA for the demo page

**Improvement**

[6b22fe2](https://github.com/huei90/angular-validation/commit/6b22fe2065e91cd051ecae973facadd115504c52) Documentation for bootstrap form group
<br/>[dffdc32](https://github.com/huei90/angular-validation/commit/dffdc3262e8631bc586bf7c9c030864d8b77fbf0) Allow passing of a parameter to validation rule and added min and max length rules

**Fix**

[09f9731](https://github.com/huei90/angular-validation/commit/09f9731170a63704d0befdbbdd635e700af35433) second validator fires but does not wait

**New Featuers**

[1b9d527](https://github.com/huei90/angular-validation/commit/1b9d52713c32d1b73c90174258ea9b0cc781489a) toggle has-error on parent form-group with $validationProvider valid/invalid callbacks

02 Feb 2015 v1.3.0
===
**Important**

This version support angularjs 1.3

**Improvement**

[b6a70b2](https://github.com/huei90/angular-validation/commit/a6ac1400a8a637bc2296a1910c3456797b6a70b2) Use ctrl.$viewValue instead of element[0].value
<br/>[0e1925e](https://github.com/huei90/angular-validation/commit/a30e6edaffe15c64cac711a7290236b550e1925e) Default initial Validity is undefined
<br/>[8c7bfb1](https://github.com/huei90/angular-validation/commit/d505d45a93984e07f0a466d3e385e15ac8c7bfb1) Prevents span from being displayed for valid input without messages
<br/>[509e2a0](https://github.com/huei90/angular-validation/commit/8b1b46f8e37e5eb435de4a0842cb036e5509e2a0) Allows global disabling of error messages in case someone wants that

**New Features**

[717c98b](https://github.com/huei90/angular-validation/commit/8a86b03ed8a792d91a6c1c3a50a9f1a64717c98b) Add a MessageId atrribute for customizing valid/invalid message position

**Documentation**

[b638dc6](https://github.com/huei90/angular-validation/commit/744edde0326edc3ba4e2308062912e342b638dc6) Update readme with bower installation steps
<br/>[10318f8](https://github.com/huei90/angular-validation/commit/63d484979d157f3b8a0389f8220d6c91c10318f8) Update API.md for anchor link

**Demo**

[97c1e14](https://github.com/huei90/angular-validation/commit/ff1aee1d4874fb247b2562a7913a9f14497c1e14) Add demo for select form
<br/>[71f6e0b](https://github.com/huei90/angular-validation/commit/64b8eee0e98600ab1d3945dbe78dd651e71f6e0b) Add ng-repeat input box example

Thanks @lvarayut @eyupatis @U-US\katerbm @dmitry-dedukhin for the contributions

14 Nov 2014 v1.2.6
===
**Important**

This version support to angularjs version 1.2.x <br/>
To support angularjs version 1.3.x, please use angular-validation 1.3.x

**Fix**

[bcaab7e](https://github.com/huei90/angular-validation/commit/bcaab7e31f2e00e92e2d8e8397935c96c37d16b3) Custom message on html not displaying with multiple validator

24 Aug 2014 v1.2.5
===
**New Features**

[911b791](https://github.com/huei90/angular-validation/commit/911b7917a4b1b302982a0f3b42c54da3bd28ee28) Support for multiple validators on a single input

**Tools**

[c941b0b](https://github.com/huei90/angular-validation/commit/c941b0bd4c8c350cf1cfa910a1eabff184280031) Add jshint and jsbeautifier

1 Aug 2014 v1.2.2
===
**Fix**

[a96c499](https://github.com/huei90/angular-validation/commit/a96c499967e0c0512a536545ea102ebc6283e1c6) Fix validationSubmit directive to avoid non interpretation of others angular treatments
<br/>[0474c8a](https://github.com/huei90/angular-validation/commit/0474c8aeb51dbb558fca88191cbba7e32423515b) Fixed customizable initial validation.

**Demo**

[5f06982](https://github.com/huei90/angular-validation/commit/5f069820d2520a2bfc4e52906d446dac5edf2d97) Fix rule required

**Documentation**

[17e906a](https://github.com/huei90/angular-validation/commit/17e906a6050bf8e62f6ad304eec65042dddfcced) Update readme file and add Q&A API page

10 July 2014 v1.2.1
===
**New features**

[6a682b0](https://github.com/huei90/angular-validation/commit/6a682b0ac0928f8a426dc7ba0cf82de622c33cda) Add rule.js => angular-validation-rule.js
<br/>[343f578](https://github.com/huei90/angular-validation/commit/343f578f7aab2a56ecf280635a5d668f4ebc1966) Show error message when the form is undefined
<br/>[78e15a3](https://github.com/huei90/angular-validation/commit/78e15a34e0180a45bdd73dcb0677a4fbc796fd9f) Allow validate/reset multiple scope model
<br/>[e16c592](https://github.com/huei90/angular-validation/commit/e16c592cd7d31f7537f4c960505fe52d060a13d3) Allow validate/reset only one scope model

**Documentation**

[172fd8c](https://github.com/huei90/angular-validation/commit/172fd8ccf9113fceac18e982af30fdf0da8592e2) Added bootstrap integration to readme. Moved contributing info to CON…

15 Jun 2014 v1.2.0
===
**New features**

[b1f875e](https://github.com/huei90/angular-validation/commit/b1f875e5afebae6a5f28804e6f7996fc2d1f268a) Do more in setExpression(...)
<br/>[b1d4a54](https://github.com/huei90/angular-validation/commit/b1d4a54ef51f9a13a129787e8087f1610e18b28a) New Features validation-submit & validation-reset

**Fix**

[73ff4b0](https://github.com/huei90/angular-validation/commit/73ff4b05d598f38d6f26ed433807360cdb518777) checkValid using timeout inside submit
<br/>[af5ea19](https://github.com/huei90/angular-validation/commit/af5ea19cce9d0dcd25d542e4103cb7b719f9e931) unique field event

**Documentation**

[9a6fd48](https://github.com/huei90/angular-validation/commit/9a6fd48483ecc813303ddd21fc60d5aaf76823d6) When using checkValid()

14 May 2014 v1.1.2
===
**Fix**

[964c577](https://github.com/huei90/angular-validation/commit/964c5779634f70aa1013c5c415beb9b6041678e6) Fix callback reference issue
<br/>[ea4fc94](https://github.com/huei90/angular-validation/commit/ea4fc9413546442dfda73df1d76b1a8e6a9ccd98) Add scope apply in blur callback

**Tools**

[41215a9](https://github.com/huei90/angular-validation/commit/41215a9a1cbedd82e1db31cc116243910f5af4a4) Replace connect as BrowserSync

**test**

[6ff77c8](https://github.com/huei90/angular-validation/commit/6ff77c8dc9d8de18652714dbb057803d8fcecbe1) Allow test for node 0.11

19 Apr 2014 v1.1.1
===
**New features**

[794291d](https://github.com/huei90/angular-validation/commit/794291d782b8ba8c4888d9610364d72125402408) Focus first input element when submit error [#11](https://github.com/huei90/angular-validation/issues/11)

**Fix**

[a08264c](https://github.com/huei90/angular-validation/commit/a08264c91bfd2a6bde676d9cba0a4ce3c96a5099) Fix given value '' while reset phase
<br/>[8e594cf](https://github.com/huei90/angular-validation/commit/8e594cf33d573898346a468cfcbf8f9bf7e8d5ea) Fix scope.$on('submit') order

**Documentation**

[46937cc](https://github.com/huei90/angular-validation/commit/46937cc625df9309c5bacb3e3195c151289cca78) Update Documentation, setup validation in config state

**lib**

upgrade angular.1.2.16
<br/>upgrade angular.1.3.0-beta.5

13 Apr 2014 v1.1.0
===
**New features**

[09894d8](https://github.com/huei90/angular-validation/commit/09894d8bc6a3379cc2741e456d7809a040d1ca49) Allow disable showing success message [#6](https://github.com/huei90/angular-validation/issues/6)
<br/>[ad0f55d](https://github.com/huei90/angular-validation/commit/ad0f55d69629fbec4e550277c9f5e911626c623b) Differentiate submit submit-only method [#4](https://github.com/huei90/angular-validation/issues/4)

**Fix**

[0a96acb](https://github.com/huei90/angular-validation/commit/0a96acb59f023a101612565f3e6c9173929dcf96) Fix validate.reset method

9 Apr 2014 v1.0.6
===
Include bower.json

2 Mar 2014 v1.0.5
===
**Update Features**

[51f0019](https://github.com/huei90/angular-validation/commit/51f0019477a1ec459edfea4b2966bd6a16b2a348) provider `validate` `reset` doesn't need parameter `scope` anymore

27 Dec 2013 v1.0.0 FIRST RELEASE
===
