
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    
    uglify: {
            build: {
                files: {
                'build/<%= pkg.filenameBase %>-<%= pkg.version %>.min.js': ['build/<%= pkg.filenameBase %>-<%= pkg.version %>.js']
            }
        }
    },
 
    concat: {
          build: {
            src:[ 'src/**/*.js','!src/*.js', 'src/game.js'],
            dest: 'build/<%= pkg.filenameBase %>-<%= pkg.version %>.js'
          }
    },
    
    connect: {
      server: {
        options: {
          port: 9000,
          base: './'
        }
      }
    }
 });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask("default", [
    "concat:build",
    "uglify:build"
    ]);
  
  grunt.registerTask('serve', [
    'connect:server:keepalive'
    ]);

  
  

};