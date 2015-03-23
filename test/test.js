'use strict';

var chai = require("chai");
var assert = chai.assert;
var conceptNet = require('../src/store.js');

describe('conceptNet', function tests() {
	describe('config', function test() {
		it('creates an instance of conceptNet', function (done) {
			var cnet = new conceptNet();
			assert(cnet instanceof conceptNet);
			done();
		});

		it('can be invoked without new', function (done) {
			var cnet = conceptNet();
			assert(cnet instanceof conceptNet);
			done();
		});

		describe('defaults', function tests() {
			it('has default hostname', function test(done) {
				var cnet = new conceptNet();
				assert(cnet.host === 'conceptnet5.media.mit.edu');
				done();
			});

			it('has default port', function test(done) {
				var cnet = new conceptNet();
				assert(cnet.port === 80);
				done();
			});

			it('has default version', function test(done) {
				var cnet = new conceptNet();
				assert(cnet.version === '5.2');
				done();
			});
		});

		describe('override', function(){
			it('has set hostname', function (done) {
				var cnet = new conceptNet('10.0.0.1','1234','5.3');
				assert(cnet.host === '10.0.0.1');
				done();
			});

			it('has set port', function test(done) {
				var cnet = new conceptNet('10.0.0.1','1234','5.3');
				assert(cnet.port === 1234);
				done();
			});

			it('has set version', function test(done) {
				var cnet = new conceptNet('10.0.0.1','1234','5.3');
				assert(cnet.version === '5.3');
				done();
			});

			it('only overrides the version', function test(done) {
				var cnet = new conceptNet(null, null,'5.3');
				assert(cnet.host === 'conceptnet5.media.mit.edu');
				assert(cnet.version === '5.3');
				done();
			});
		});

		describe('.lookup()', function tests() {

			it('looks up a single concept URI', function test(done) {
				this.timeout(1000);
				var cnet = new conceptNet();
				cnet.lookup("/c/en/toast",{
					offset: 0}, function(err, result){
						assert(result.numFound > 0);
						done();
					}
				);
			});

			it('looks up a single concept URI with filter', function test(done) {
				this.timeout(1000);
				var cnet = new conceptNet();
				cnet.lookup("/c/en/toast",{
					offset: 0,
					filter: "core"}, function(err, result){
						assert(result.numFound > 0);
						done();
					}
				);
			});

			it('looks up a single concept URI with custom limit', function test(done) {
				this.timeout(1000);
				var cnet = new conceptNet();
				cnet.lookup("/c/en/toast",{
					limit: 2,
					offset: 0,
					filter: "core"}, function(err, result){
						assert(result.edges.length === 2);
						done();
					}
				);
			});

		});

		it('is possible to use search method to retrieve results', function test(done) {
			this.timeout(1000);
			var cnet = new conceptNet();
			cnet.search({text: "donut"}, function(err, result){
				assert(result.numFound > 0);
				done();
			});
		});


		describe(".association()", function tests() {

			it('is possible to retrieve associations', function test(done) {
				this.timeout(3000);
				var cnet = new conceptNet();
				cnet.association("/c/en/hotdog",{
					"filter": "/c/en/donut"},
					function(err, result){
						assert(result.similar.length > 0);
						done();
					});
			});

			it('is possible to retrieve associations with limit', function test(done) {
				this.timeout(3000);
				var cnet = new conceptNet();
				cnet.association("/c/en/cat",{
					"limit": 4,
					"filter": "/c/en/dog"},
					function(err, result){
						assert(result.similar.length === 4);
						done();
					});
			});

			it('is possible to retrieve associations for term list', function test(done) {
				this.timeout(3000);
				var cnet = new conceptNet();
				cnet.association("/list/en/toast,cereal",{"limit":5},
					function(err, result){
						assert(result.similar.length > 0);
						done();
					});
			});

			it('error when not supplying concept URI or path to association', function test(done) {
				this.timeout(3000);
				var cnet = new conceptNet();
				cnet.association("hotdog",{
					"limit": 10,
					"filter": "/c/en/donut"},
					function(err) {
						assert(err !== undefined);
						done();
					});
			});

			it('error when not supplying concept URI to filter options', function test(done) {
				this.timeout(3000);
				var cnet = new conceptNet();
				cnet.association("/c/en/hotdog",{
					"limit": 10,
					"filter": "donut"},
					function(err) {
						assert(err !== undefined);
						done();
					});
			});
		});

	 });
});
