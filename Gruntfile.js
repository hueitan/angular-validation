module.exports = function (grunt) {

    // Variable
    var ROOT_PATH = '.';

    // Grunt Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            'dist'
                        ]
                    }
                ]
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
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/angular-validation.min.js': ['dist/angular-validation.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    protocol: 'http',
                    hostname: '*',
                    port: 8080,
                    base: ROOT_PATH
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register Task
    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'concat', 'uglify'])

};