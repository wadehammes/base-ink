module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      //- Compile Sass
      sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'src/css/main.css': 'src/css/scss/main.scss'
          }
        }
      },

      //- Assemble Layouts
      assemble: {
        options: {
          layoutdir: 'src/layouts',
          flatten: true
        },
        pages: {
          src: ['src/emails/*.hbs'],
          dest: 'test/'
        }
      },

      //- Inline CSS
      premailer: {
        simple: {
          options: {
            removeComments: true
          },
          files: [{
              expand: true,
              src: ['test/*.html'],
              dest: ''
          }]
        }
      },

      //- Minify the HTML
      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: {
            'dist/template.html': 'test/*.html'
          }
        }
      },

      //- Watch for changes
      watch: {
        files: ['src/css/scss/*','src/emails/*','src/layouts/*'],
        tasks: ['default']
      }

  });
  grunt.loadNpmTasks('assemble');

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass','assemble','premailer', 'htmlmin', 'watch']);

};
