'use strict';

module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		compass: {
			compile: {
				options: {
					config: 'config.rb',
					force: true,
				},
			}
		},
		// jshint: {
		//     options: {
		//         jshintrc: '.jshintrc',
		//         reporter: require('jshint-stylish'),
		//         ignores: ['public/scripts/libs/*']
		//     },
		//     all: [
		//         'Gruntfile.js',
		//         'public/scripts/{,*/}*.js',
		//     ]
		// },
		mocha: {
            urls: ['http://localhost:8001/test.html'],
			options: {
				run: true,
				log: true,
			}
		},
		watch: {
			css: {
				files: ['public/styles/**/*.scss'],
				tasks: ['compass']
			},
			options: {
				livereload: true,
			},
			test: {
				files: ['tests/spec/**/*.js'],
				tasks: ['test']
			},
		},
		clean: {
		    dist: ['public/.tmp', 'dist/*'],
		    server: 'public/.tmp'
		},
		concurrent: {
		},
		connect: {
		    options: {
		        port: 8000,
		        hostname: 'localhost',
		        livereload: true,
		    },
		    test: {
		        options: {
		            port: 8001,
					target: 'http://localhost:8001/test.html',
		        	open: true,
		            middleware: function (connect) {
		                return [
		                    connect.static('tests'),
		                    connect.static('public')
		                ];
		            }
		        }
		    },
		    server: {
		        options: {
		        	open: true,
		            middleware: function(connect) {
		                return [
		                    connect.static('public')
		                ];
		            }
		        }
		    },
		},


	});

	grunt.registerTask('server', [
		'clean:server',
		'compass',
		'connect:server',
		'watch'
	]);

	grunt.registerTask('test', [
		'connect:test',
		'mocha',
		'watch:test'
	]);

	grunt.registerTask('build', [
	]);

	grunt.registerTask('default', [
		'server'
	]);

};