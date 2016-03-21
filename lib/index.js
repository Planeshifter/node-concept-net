'use strict';

var http = require('http');
var querystring = require('querystring');

// constructor function
function ConceptNet( host, port, version ) {

    // if not invoked as a constructor call
    if ( !(this instanceof ConceptNet) ){
        return new ConceptNet(host, port, version);
    }

    this.host = host || 'conceptnet5.media.mit.edu';
    this.version = version || '5.4';
    this.port = parseInt(port || 80);
}

ConceptNet.prototype.buildOptions = function( path ) {
    var options = {};
    options.hostname = this.host;
    options.port = this.port;
    options.path = path;
    return options;
};

ConceptNet.prototype.lookup = function( URI, params, callback ) {

    var limit = params.limit || 50;
    var offset = params.offset || 0;

    var path = "/data/" + this.version + String( encodeURIComponent(URI) ) +
        "?limit=" + limit + "&offset=" + offset;

    if ( params.filter === "core" ) {
        path += "&filter=core";
    }

    this.makeHtppRequest(this.buildOptions(path), callback);
};

ConceptNet.prototype.URIstd = function( language, text, callback ) {

    text = text.replace(/\s+/g, '_');

    var path = "/data/" + this.version + "/uri?language=" + language + "&text=" + String( encodeURIComponent(text) );

    this.makeHtppRequest(this.buildOptions(path), callback);
};

ConceptNet.prototype.search = function( params, callback ) {

    var path = "/data/" + this.version + "/search?";
    var str = querystring.stringify(params);
    str = querystring.unescape(str);
    path += str;

    this.makeHtppRequest(this.buildOptions(path), callback);

};

function isConceptNetURI( uri ) {

    var  myRegEx = /\/(?:[acdelrs]|and|or)\/[a-zA-Z]{2}\/\w+/;
    return (myRegEx.test(uri) ? true : false);

}

function isValidTermPath( path ) {

    var myRegEx = /\/list\/[a-zA-Z]{2}\/\w+(?:@[-+]?[0-9]*\.?[0-9]+)?(,\w+(?:@[-+]?[0-9]*\.?[0-9]+)?)*/;
    return (myRegEx.test(path) ? true : false);

}

ConceptNet.prototype.association = function( input, params, callback ) {

    if( !isConceptNetURI(input) && !isValidTermPath(input) ) {
      var err = new Error("The input argument must be either a valid ConceptNet URI or a path of the form " +
          "/list/<language>/<term list>");
      return callback(err);
    }

    var limit = params.limit || 10;
    var path = "/data/" + this.version + "/assoc" + String(input);

    if ( params.filter ) {
        if ( isConceptNetURI(params.filter) ) {
            path += "?filter=" + params.filter + "&limit=" + limit;
        } else {
            var err2 = new Error("The GET argument filter must be a valid ConceptNet URI.");
            return callback(err2);
        }
    }

    this.makeHtppRequest( this.buildOptions(path), callback );
};

ConceptNet.prototype.makeHtppRequest = function( options, callback ) {
    var retrieve = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            callback(undefined, JSON.parse(str));
        });
    };

    http.request( options, retrieve ).end();
};

// export node module
module.exports = ConceptNet;
