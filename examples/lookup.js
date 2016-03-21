'use strict';

var ConceptNet = require( '../lib/index.js' );
var cNet = new ConceptNet();

cNet.lookup( '/c/en/toast',{
	limit: 10,
	offset: 0,
	filter: 'core'
}, function onDone( err, result ) {
	console.log(result);
});
