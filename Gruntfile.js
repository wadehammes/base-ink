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
            'src/css/main.css': 'src/scss/main.scss'
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
          files: [{
            expand: true,
            cwd: 'test/',
            src: '**/*.html',
            dest: 'dist/'
          }]
        }
      },

      //- Listen for changes on save
      watch: {
        files: ['src/scss/*','src/emails/*','src/layouts/*'],
        tasks: ['default']
      },

      //- Test via Litmus
      litmus: {
        options: {
          username: '',
          password: '',
          url: '',
          clients: ['gmailnew', 'ffgmailnew', 'chromegmailnew']
        },
        your_target: {
          src: ['dist/'+grunt.option('template')]
        },
      },

      //- Send email through Mailgun
      mailgun: {
        mailer: {
          options: {
            key: '',
            sender: '',
            recipient: '',
            subject: 'TEST: This is a test email'
          },
          src: ['dist/'+grunt.option('template')]
        }
      },

  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['sass','assemble','premailer','htmlmin','watch']);

  // Test with Litmus
  grunt.registerTask('test', ['litmus']);

  // Use grunt send if you want to actually send the email to your inbox
  grunt.registerTask('send', ['mailgun']);

};
