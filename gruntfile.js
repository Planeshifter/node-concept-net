module.exports = function(grunt){
	
	  // load grunt modules
	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  
	  grunt.initConfig({
		   watch: {
        	target1: {
        	files: ['src/*.js','gruntfile.js'],
        	tasks: ['jshint','watch']
        	},
		   },
		   jshint: {
		    	all: ['src/*.js','gruntfile.js']
		    }
	  });
	  
	  grunt.registerTask('default', ['watch']);
	
};