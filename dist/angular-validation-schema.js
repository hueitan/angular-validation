/*
	***************************************
			SCHEMA VALIDATOR
	***************************************
	Schema validator for angular-valiation, good
	if you want to keep your backend validation rules
	in sync or your hate making your html too declarative.
	@author - Harminder Virk
	@github - https://github.com/thetutlage/angular-validation-schema
*/

(function() {
  var app = angular.module('validation.schema', [])

    // Tiny provider to save and fetch schemas
    .provider('validationSchema', function() {

      // List of schemas are stored here
      var schemas = {};

      // Adding schema to object
      this.set = function(name, hash) {
        schemas[name] = hash;
      };

      // fetching from object
      this.get = function(name) {
        return schemas[name];
      }

      // Exposing them here
      this.$get = function() {
        return {
          set: this.set,
          get: this.get
        }
      }
    })

    // Required directive
    .directive('validationSchema', ['validationSchema', function(validationSchema) {
      return {
        restrict: 'AE',
        compile: function(tElem, tAttrs) {
          // Default schema to extend upon
          var defaultSchema = {
            // default validation is set to required
            'validations': 'required',
            'validate-on': 'watch'
          };

          var globalMessages = {};

          // Grabbing schema the user wants
          var schema = validationSchema.get(tAttrs.schema);

          if (schema) {

            // If it is an valid schema , then setFixtures
            setFixtures(schema);

          } else {

            // Otherwise show warning of non-existing schema
            warnDeveloper(tAttrs.schema);
          }

          // Warn developer method
          function warnDeveloper(schema) {

            // Error message
            var error_message = schema + ' Schema not found';

            // Outputting to console
            console.warn('VALIDATION SCHEMA :', error_message);
          }

          function setFixtures(schema) {

            // If schema has globals
            if (schema.globals) {

              // Remove defaultSchema validations with globals
              defaultSchema.validations = schema.globals.validations || defaultSchema.validations;

              // Remove validate-on validations with globals
              defaultSchema["validate-on"] = schema.globals["validate-on"] || defaultSchema["validate-on"];

              // Set globalMessages if globals have one or empty object
              globalMessages = schema.globals.messages || {};

              // Delete schema globals as not required anymore
              delete schema.globals;
            }

            // Deep extending objects
            function extendDeep(dst) {

              // Looping through all the values
              angular.forEach(arguments, function(obj) {
                if (obj !== dst) {
                  angular.forEach(obj, function(value, key) {
                    if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {

                      // Rerun if above key is an Object

                      extendDeep(dst[key], value);

                    } else {

                      // Extend here

                      dst[key] = dst[key] || value;
                    }
                  });
                }
              });
              return dst;
            }

            // schema.firstname = extendDeep(schema.firstname,defaultSchema);

            // Grabbing all form elements inside the tElem
            var formElements = tElem[0].querySelectorAll('input,select,textarea');

            // Looping through all form Elements
            angular.forEach(formElements, function(input) {

              // Getting instance of angular element
              var i = angular.element(input);

              // Grabbing name
              // @description -  Name is required to match keys on schema
              // @example - firstname key on schema will be matched with firstname as form
              // 						element name

              var input_name = i.attr('name');

              // If schema defination exists
              if (schema[input_name]) {

                // Deep extend rules to save undefined stuff
                var i_schema = extendDeep(schema[input_name], defaultSchema);

                // Setting validator on field
                i.attr('validator', i_schema.validations);

                // Setting valid-method on field
                i.attr('valid-method', i_schema['validate-on']);

                // Extends messages using global and field values
                i_schema.messages = i_schema.messages || {};
                i_schema.messages = extendDeep(i_schema.messages, globalMessages);

                // Looping through messages object
                angular.forEach(i_schema.messages, function(vals, key) {

                  // Grabbing error message and replace %field% with input name
                  var error_message = vals.error ? vals.error.replace('%field%', input_name) : '';

                  // Grabbing success message and replace %field% with input name
                  var success_message = vals.success ? vals.success.replace('%field%', input_name) : '';

                  // Setting error message for validation type
                  i.attr(key + '-error-message', error_message);

                  // Setting success message for validation type
                  i.attr(key + '-success-message', success_message);

                });
              }

            });
          }
        }
      }
    }]);
}).call(this);
