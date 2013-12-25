'use strict';

/* jasmine specs for provider go here */

describe('provider', function () {
    beforeEach(module('validation.provider'));

    describe('setup Expression', function () {
        it('After setup, it should still be expression(Regex or Function)', inject(function ($validation) {
            $validation.setExpression({ huei: /^huei$/ });
            expect($validation.getExpression('huei')).toEqual(jasmine.any(RegExp));
            $validation.setExpression({ huei: function () {
                return true;
            }});
            expect($validation.getExpression('huei')).toEqual(jasmine.any(Function));
        }));
    });

    describe('setup defaultMsg', function () {
        it('After setup, it should still be Msg', inject(function ($validation) {
            var obj = {
                huei: {
                    error: 'It\'s should be huei',
                    success: 'It\'s huei'
                }
            };

            $validation.setDefaultMsg(obj);

            expect($validation.getDefaultMsg('huei')).toEqual(jasmine.any(Object));
            for (var key in $validation.getDefaultMsg('huei')) {
                expect($validation.getDefaultMsg('huei')[key]).toEqual(jasmine.any(String));
            }
        }));
    });
});