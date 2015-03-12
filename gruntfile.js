/*globals module */
"use strict";

// Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Variable configuration
        app: {
            js: ['app/javascript'],
            style: ['app/scss'],
        },
        build: {
            js: ['build/javascript'],
            style: ['build/css'],
        },
        dist: {
            js: ['dist/javascript'],
            style: ['dist/css'],
        },

        // Task configuration
        bower_concat: {
            all: {
                dest: '<%= build.js %>/bower.js',
                cssDest: '<%= build.style %>/bower.css',
                dependencies: {
                    'bootstrap': 'jquery',
                    'underscore': 'jquery',
                    'backbone': 'underscore',
                },
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            app: {
                nonull: true,
                src: [
                    '<%= app.js %>/utilities.js',
                    '<%= app.js %>/settings.js',
                    '<%= app.js %>/templates.js',
                    '<%= app.js %>/Models/*.js',
                    '<%= app.js %>/Collections/*.js',
                    '<%= app.js %>/Views/*.js',
                    '<%= app.js %>/Router/*.js',
                    '<%= app.js %>/app.js',
                ],
                dest: '<%= build.js %>/script.js'
            },
            build: {
                src: ['<%= build.js %>/bower.js', '<%= build.js %>/script.js'],
                dest: '<%= dist.js %>/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            build_css: {
                src: ['<%= build.style %>/bower.css', '<%= build.style %>/style.css'],
                dest: '<%= dist.js %>/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        sass: { // https://github.com/gruntjs/grunt-contrib-sass
            app: {
                options: {
                    style: 'expanded',    // nested, compact, compressed, expanded
                    sourcemap: "none",      // auto, file, inline, none
                    compass: false          // = default
                },
                files: {
                    '<%= build.style %>/style.css': '<%= app.style %>/base.scss'
                }
            }
        },
        // uglify{
        //     //...
        // },
        watch: {
            concat: {
                files: [
                    '<%= app.js %>/*.js',
                    '<%= app.js %>/Models/*.js',
                    '<%= app.js %>/Collections/*.js',
                    '<%= app.js %>/Views/*.js',
                    '<%= app.js %>/Router/*.js',
                ],
                tasks: ['concat:app']
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
    grunt.registerTask('dist', ['concat:build', 'concat:build_css']);
    grunt.registerTask('all', ['bower_concat', 'sass', 'concat:app', 'concat:build', 'concat:build_css']);
};

