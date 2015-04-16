// Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Variable configuration
        app: {
            base: ['app'],
            js: ['app/javascript'],
            style: ['app/scss'],
            fonts: ['app/bower_components/bootstrap/fonts'],
            images: ['app/images'],
            assets: ['app/assets'],
        },
        build: {
            base: ['build'],
            js: ['build/javascript'],
            style: ['build/css'],
            fonts: ['build/fonts'],
            images: ['build/images'],
            assets: ['build/assets'],
        },
        dist: {
            base: ['dist'],
            js: ['dist/javascript'],
            style: ['dist/css'],
            fonts: ['dist/fonts'],
            images: ['dist/images'],
            assets: ['dist/assets'],
        },

        // Task configuration
        bower_concat: {
            app: {
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
            app_js: {
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
            }
        },
        sass: { // https://github.com/gruntjs/grunt-contrib-sass
            app_style: {
                options: {
                    style: 'compressed',    // nested, compact, compressed, expanded
                    sourcemap: "inline",    // auto, file, inline, none
                    compass: false          // = default
                },
                files: {
                    '<%= build.style %>/style.css': '<%= app.style %>/base.scss'
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['$', '_', 'Backbone']
                },
            },
            build_js: {
                files: { '<%= dist.js %>/script.js': ['<%= build.js %>/script.js'] }
            }
        },
        watch: {
            concat_html: {
                files: ['<%= app.base %>/*.html'],
                tasks: ['copy:app_html']
            },
            concat_js: {
                files: [
                    '<%= app.js %>/*.js',
                    '<%= app.js %>/Models/*.js',
                    '<%= app.js %>/Collections/*.js',
                    '<%= app.js %>/Views/*.js',
                    '<%= app.js %>/Router/*.js',
                ],
                tasks: ['concat:app_js']
            },
            sass: {
                files: '<%= app.style %>/{,*/}*.{scss,sass}',
                tasks: ['sass:app']
            }
        },
        copy: {
            app_html:     { expand: true, cwd: '<%= app.base %>/',     src: '*.html',   dest: '<%= build.base %>/'   },
            app_fonts:    { expand: true, cwd: '<%= app.fonts %>/',    src: '**/*',     dest: '<%= build.fonts %>/'  },
            app_images:   { expand: true, cwd: '<%= app.images %>/',   src: '**/*',     dest: '<%= build.images %>/' },
            app_assets:   { expand: true, cwd: '<%= app.assets %>/',   src: '**/*',     dest: '<%= build.assets %>/' },
            build_bower:  { expand: true, cwd: '<%= build.js %>/',     src: 'bower.js', dest: '<%= dist.js %>/'      },
            build_html:   { expand: true, cwd: '<%= build.base %>/',   src: '*.html',   dest: '<%= dist.base %>/'    },
            build_style:  { expand: true, cwd: '<%= build.style %>/',  src: '*.css',    dest: '<%= dist.style %>/'   },
            build_fonts:  { expand: true, cwd: '<%= build.fonts %>/',  src: '**/*',     dest: '<%= dist.fonts %>/'   },
            build_images: { expand: true, cwd: '<%= build.images %>/', src: '**/*',     dest: '<%= dist.images %>/'  },
            build_assets: { expand: true, cwd: '<%= build.assets %>/', src: '**/*',     dest: '<%= dist.assets %>/'  },
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task definition
    grunt.registerTask('all', [
        'bower_concat:app', 'copy:app_assets',   'copy:app_images',   'copy:app_html',   'concat:app_js',   'sass:app_style',   'copy:app_fonts',
        'copy:build_bower', 'copy:build_assets', 'copy:build_images', 'copy:build_html', 'uglify:build_js', 'copy:build_style', 'copy:build_fonts'
    ]);
    grunt.registerTask('default', ['all', 'watch']);
};

