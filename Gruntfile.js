'use strict';


module.exports = function (grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/unit/util/*.js']
            }
        }
    });


    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });


    grunt.loadNpmTasks('grunt-makara-amdify');

    grunt.loadNpmTasks('grunt-mocha-test');


    // Register group tasks

    grunt.registerTask('build', ['jshint', 'dustjs', 'less', 'requirejs', 'copyto']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);

};
