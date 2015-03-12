'use strict';

// Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Variable configuration
        app: {
            js: ['app/assets/javascript'],
            scss: ['app/assets/scss'],
        },
        build: {
            js: ['build/javascript'],
            css: ['build/css'],
        },
        dist: {
            js: ['dist/javascript'],
            css: ['dist/css'],
        },

        // Task configuration
        bower_concat: {
            all: {
                dest: '<%= build.js %>/bower.js',
                // cssDest: '<%= build.css%>/bower.css',
                // exclude: [
                // 'jquery',
                // 'modernizr'
                // ],
                dependencies: {
                    'bootstrap-sass-official': 'jquery',
                    'underscore': 'jquery',
                    'backbone': 'underscore',
                },
            }
        },
        concat: {
            options: {
                separator: ';',
                nonull: true,
            },
            app: {
                src: [
                    '<%= app.js %>/utilities.js',
                    '<%= app.js %>/settings.js',
                    '<%= app.js %>/templates.js',
                    '<%= app.js %>/Models/{,*/}*.js',
                    '<%= app.js %>/Collections/{,*/}*.js',
                    '<%= app.js %>/Views/{,*/}*.js',
                    '<%= app.js %>/Router/{,*/}*.js',
                    '<%= app.js %>/app.js',
                ],
                dest: '<%= build.js %>/script.js'
            },
            build: {
                src: ['<%= build.js %>/bower.js', '<%= build.js %>/script.js'],
                dest: '<%= dist.js %>/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        sass: { // https://github.com/gruntjs/grunt-contrib-sass
            app: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= dist.css %>/style.css': '<%= app.scss %>/base.scss'
                }
            }
        },
        // uglify{
        //     //...
        // },
        watch: {
            concat: {
                files: '<%= app.js %>/{,*/}*.js',
                tasks: ['concat:app', 'concat:build']
            },
            sass: {
                files: '<%= app.scss %>/{,*/}*.{scss,sass}',
                tasks: ['sass:app']
            }
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Task definition
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('bower', ['bower_concat']);
};

