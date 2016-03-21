'use strict';

var ConceptNet = require( '../lib/index.js' );
var cNet = new ConceptNet();

cNet.search({
	text: 'donut'
}, function onDone( err, result ) {
	console.log( result );
});
