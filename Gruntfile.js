module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        watch: {
            files: 'styles/**/*.less',
            tasks: ['less:development', 'postcss:development']
        },
        less: {
            development: {
                files: {
                    'styles/deck-of-cards.css': 'styles/deck-of-cards.less'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [require('autoprefixer')({ browser: ['ie 11', 'last 2 Chrome versions', 'last 2 Firefox versions'] })]
            },
            development: {
                src: 'styles/deck-of-cards.css'
            }
        }
    });

    grunt.registerTask(
        'build',
        'Compiles Less',
        ['watch']
        );
        
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    //grunt.loadNpmTasks('autoprefixer');
}