module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		watch: {
			files: 'styles/**/*.less',
			tasks: ['less:development']
		},
		less: {
			development: {
				files: {
					'styles/deck-of-cards.css': 'styles/deck-of-cards.less'
				}
			}
		}
	});

	grunt.registerTask(
		'build',
		'Compiles Less',
		['watch']
	)

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
}