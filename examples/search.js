var ConceptNet = require("../src/store.js");
var conceptNet = new ConceptNet();

conceptNet.search({
	text: "donut"}, function(err, result){
	    console.log(result);
	    });
