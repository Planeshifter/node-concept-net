'use strict';

// MODULES //

var chai = require( 'chai' );
var assert = chai.assert;
var ConceptNet = require( '../lib/index.js' );


// TESTS //

describe( 'conceptNet', function tests() {
	describe( 'config', function test() {
		it( 'creates an instance of conceptNet', function test( done ) {
			var cnet = new ConceptNet();
			assert( cnet instanceof ConceptNet );
			done();
		});

		it( 'can be invoked without new', function test( done ) {
			// jshint newcap: false
			var cnet = ConceptNet();
			assert( cnet instanceof ConceptNet );
			done();
		});

		describe( 'defaults', function tests() {
			it( 'has default hostname', function test( done ) {
				var cnet = new ConceptNet();
				assert( cnet.host === 'conceptnet5.media.mit.edu' );
				done();
			});

			it( 'has default port', function test( done ) {
				var cnet = new ConceptNet();
				assert( cnet.port === 80 );
				done();
			});

			it( 'has default version', function test( done ) {
				var cnet = new ConceptNet();
				assert( cnet.version === '5.4' );
				done();
			});
		});

		describe( 'override', function() {
			it( 'has set hostname', function test( done ) {
				var cnet = new ConceptNet( '10.0.0.1', '1234', '5.3' );
				assert( cnet.host === '10.0.0.1' );
				done();
			});

			it( 'has set port', function test( done ) {
				var cnet = new ConceptNet('10.0.0.1','1234','5.3');
				assert( cnet.port === 1234 );
				done();
			});

			it( 'has set version', function test( done ) {
				var cnet = new ConceptNet('10.0.0.1','1234','5.3');
				assert( cnet.version === '5.3' );
				done();
			});

			it( 'only overrides the version', function test( done ) {
				var cnet = new ConceptNet(null, null,'5.3');
				assert( cnet.host === 'conceptnet5.media.mit.edu' );
				assert( cnet.version === '5.3' );
				done();
			});
		});

		describe( '.lookup()', function tests() {

			it( 'looks up a single concept URI', function test( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.lookup('/c/en/toast', {
					offset: 0}, function( err, result ) {
						assert( result.numFound > 0 );
						done();
					}
				);
			});

			it( 'looks up a single concept URI with filter', function test( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.lookup('/c/en/toast',{
					offset: 0,
					filter: 'core'}, function( err, result ) {
						assert(result.numFound > 0);
						done();
					}
				);
			});

			it( 'looks up a single concept URI with custom limit', function test( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.lookup('/c/en/toast', {
					limit: 2,
					offset: 0,
					filter: 'core'}, function( err, result ){
						assert( result.edges.length === 2 );
						done();
					}
				);
			});

			it( 'handles concepts in other languages', function otherLangTest( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.lookup('/c/ja/車',{
					filter: 'core'}, function( err, result ) {
						assert( result.edges.length === 50 );
						done();
					}
				);
			});
		});

		it( 'is possible to use search method to find ConceptNet edges for multiple requirements', function test( done ) {
			this.timeout(2000);
			var cnet = new ConceptNet();
			cnet.search({start: '/c/en/donut'}, function( err, result ) {
				assert( result.numFound > 0 );
				done();
			});
		});

		describe( '.URIstd()', function tests() {

			it( 'looks up the ConceptNet URI for text (english)', function test( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.URIstd('en', 'ground beef', function( err, result ) {
						assert( result.uri === '/c/en/grind_beef' );
						done();
					}
				);
			});

			it( 'looks up the ConceptNet URI for text (foreign language)', function test( done ) {
				this.timeout(2000);
				var cnet = new ConceptNet();
				cnet.URIstd('ja', '車', function( err, result ) {
						assert( result.uri === '/c/ja/車' );
						done();
					}
				);
			});
		});

		describe( '.association()', function tests() {

			it( 'is possible to retrieve associations', function test( done ) {
				this.timeout(3000);
				var cnet = new ConceptNet();
				cnet.association('/c/en/hotdog', {
					filter: '/c/en/donut'},
					function( err, result ) {
						assert( result.similar.length > 0 );
						done();
					});
			});

			it( 'is possible to retrieve associations with limit', function test( done ) {
				this.timeout(3000);
				var cnet = new ConceptNet();
				cnet.association('/c/en/cat', {
					limit: 1,
					filter: '/c/en/dog'},
					function( err, result ) {
						assert( result.similar.length === 1 );
						done();
					});
			});

			it( 'is possible to retrieve associations for term list', function test( done ) {
				this.timeout(3000);
				var cnet = new ConceptNet();
				cnet.association( '/list/en/toast,cereal', {'limit':5},
					function( err, result ) {
						assert( result.similar.length > 0 );
						done();
					});
			});

			it( 'error when not supplying concept URI or path to association', function test( done ) {
				this.timeout(3000);
				var cnet = new ConceptNet();
				cnet.association('hotdog', {
					limit: 10,
					filter: '/c/en/donut'},
					function( err ) {
						assert( err !== undefined );
						done();
					});
			});

			it( 'error when not supplying concept URI to filter options', function test( done ) {
				this.timeout(3000);
				var cnet = new ConceptNet();
				cnet.association('/c/en/hotdog', {
					limit: 10,
					filter: 'donut'},
					function( err ) {
						assert( err !== undefined );
						done();
					});
			});
		});

	 });
});
