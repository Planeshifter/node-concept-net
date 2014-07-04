var http = require('http');
var querystring = require('querystring');

// constructor 
function ConceptNet(){

	if (!(this instanceof ConceptNet)){
		return new ConceptNet();
	}
	
	this.host = 'conceptnet5.media.mit.edu';
	
};

ConceptNet.prototype.lookup = function(URI, params, callback){
	
	var limit = params.limit || 50;
	var offset = params.offset || 0;
	
	var path = "/data/5.2" + String(URI) + "?limit=" + limit + "&offset=" + offset;
	if (params.filter === "core") path += "&filter=core";
	
	var options = {};
	options.host = this.host;
	options.path = path;
	
	this.makeHtppRequest(options, callback);
};

ConceptNet.prototype.search = function(params, callback){
	 var path = "/data/5.2/search?";
	 
	 path += querystring.stringify(params);
	 
	 var options = {};
	 options.host = this.host;
	 options.path = path;
	 
	 this.makeHtppRequest(options, callback);
}

function isConceptNetURI(uri){
	var  myRegEx = /\/(?:[acdelrs]|and|or)\/[a-zA-Z]{2}\/\w+/;
	return (myRegEx.test(uri) ? true : false);
} 

function isValidTermPath(path){
	var myRegEx = /\/list\/[a-zA-Z]{2}\/\w+(?:@[-+]?[0-9]*\.?[0-9]+)?(,\w+(?:@[-+]?[0-9]*\.?[0-9]+)?)*/;
	return (myRegEx.test(path) ? true : false);
}

ConceptNet.prototype.association = function(input, params, callback){
		
		if(!isConceptNetURI(input) && !isValidTermPath(input)){
			var err = new Error("The input argument must be either a valid ConceptNet URI or a path of the form " +
					"/list/<language>/<term list>");
			return callback(err);
		}
	
	 	 var path = "/data/5.2/assoc" + String(input) + "?limit" + limit;
		 var limit = params.limit || 10;
		 
		 if (params.filter){
			 if (isConceptNetURI(params.filter)) path += "&filter" + params.filter;	 
			 else{
				 var err = new Error("The GET argument filter must be a valid ConceptNet URI.");
				 return callback(err);
			 }
		 }
		 
		 var options = {};
		 options.host = this.host;
		 options.path = path;
		 
		 this.makeHtppRequest(options, callback);
};

ConceptNet.prototype.makeHtppRequest = function(options, callback){
	 var retrieve = function(response){
	 var str = '';
	 response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    callback(undefined, JSON.parse(str));
	  });
	 };
	 
	 http.request(options, retrieve).end();
};


module.exports = ConceptNet;