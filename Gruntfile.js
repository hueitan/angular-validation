module.exports = function(grunt) {

    // Variable
    var ROOT_PATH = '.';

    require('time-grunt')(grunt);

    // Grunt Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist'
                    ]
                }]
            }
        },
        copy: {
            main: {
                files: [
                    // {expand: true, cwd: 'demo', src: ['script.js'], dest: 'dist'} // partials html file
                    // {expand: true, cwd: 'app', src: ['*.*'], dest: 'dist/'}
                ]
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                    'dist/angular-validation.js': ['src/module.js', 'src/provider.js', 'src/directive.js'],
                    'dist/angular-validation-rule.js': ['src/rule.js']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/angular-validation.min.js': ['dist/angular-validation.js'],
                    'dist/angular-validation-rule.min.js': ['dist/angular-validation-rule.js']
                }
            }
        },
        jsbeautifier: {
            files: ['*.js', 'src/**/*.js'],
            options: {}
        },
        jshint: {
            all: ['*.js', 'src/**/*.js'],
            options: {
                quotmark: 'single'
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['index.html', 'demo/**', 'dist/angular-validation.js']
                },
                options: {
                    host: 'localhost',
                    ports: {
                        min: 8000,
                        max: 8100
                    },
                    server: {
                        baseDir: '.'
                    },
                    watchTask: true
                }
            }
        },
        watch: {
            files: ['src/*.js'],
            tasks: ['build'],
            options: {
                spawn: false,
                interrupt: true
            }
        },
        karma: {
            // angular 1.2.x support to version angular-validation 1.2.x
            // angular1_2: {
            //     configFile: 'config/karma.conf.angular.1.2.js'
            // }
            angular1_3: {
                configFile: 'config/karma.conf.angular.1.3.js'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Register Task
    grunt.registerTask('dev', ['browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat', 'uglify']);
    grunt.registerTask('check', ['jshint', 'jsbeautifier', 'build']); // use this before commit
    grunt.registerTask('test', ['karma']);

};
