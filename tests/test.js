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
		     
	  });
});