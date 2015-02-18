var assert = require("assert");
var conceptNet = require('../src/store.js');

describe('conceptNet', function () {
	  describe('config', function () {
		  it('creates an instance of conceptNet', function (done) {
			  var cnet = new conceptNet();
			  assert(cnet instanceof conceptNet);
			  done();
		      });
			describe('defaults', function(){
				it('has default hostname', function (done) {
					var cnet = new conceptNet();
					assert(cnet.host == 'conceptnet5.media.mit.edu');
					done();
				});

				it('has default port', function (done) {
					var cnet = new conceptNet();
					assert(cnet.port == 80);
					done();
				});

				it('has default version', function (done) {
					var cnet = new conceptNet();
					assert(cnet.version = '5.2');
					done();
				});
			});

			describe('override', function(){
				it('has set hostname', function (done) {
					var cnet = new conceptNet('10.0.0.1','1234','5.3');
					assert(cnet.host == '10.0.0.1');
					done();
				});

				it('has set port', function (done) {
					var cnet = new conceptNet('10.0.0.1','1234','5.3');
					assert(cnet.port == 1234);
					done();
				});

				it('has set version', function (done) {
					var cnet = new conceptNet('10.0.0.1','1234','5.3');
					assert(cnet.version == '5.3');
					done();
				});

				it('only overrides the version', function(done){
					var cnet = new conceptNet(null, null,'5.3');
					assert(cnet.host == 'conceptnet5.media.mit.edu')
					assert(cnet.version == '5.3');
					done();
				})
			});

		  it('looks up a single concept URI', function (done) {
			  this.timeout(1000);
			  var cnet = new conceptNet();
			  cnet.lookup("/c/en/toast",{
				    limit: 1,
				    offset: 0,
				    filter: "core"}, function(err, result){
				      assert(result.numFound > 0)
				      done()
				    }
				)
		  });
	  });
});
