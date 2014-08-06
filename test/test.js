var assert = require("assert");
var conceptNet = require('../src/store.js');	

describe('conceptNet', function () {
	  describe('config', function () {
		  
		  var cnet;
		  it('creates an instance of conceptNet', function (done) {
			  cnet = new conceptNet();
			  assert(cnet instanceof conceptNet);
			  done();
		      });  
		  
		  it('looks up a single concept URI', function (done) {
			  this.timeout(500);
			  cnet = new conceptNet();
			  cnet.lookup("/c/en/toast",{
				    limit: 1,
				    offset: 0,
				    filter: "core"}, function(err, result){
				      assert(result.numFound > 0)
				      done()
				    }) 
		  });
		     
	  });
});