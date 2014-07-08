[![NPM version](https://badge.fury.io/js/concept-net.svg)](http://badge.fury.io/js/rstats)


node-ConceptNet
===============

node.js interface to the ConceptNet semantic network API. For further information, consult the website of the project: 
[http://conceptnet5.media.mit.edu/](http://conceptnet5.media.mit.edu/).

# Introduction

The ConceptNet package can be easily installed via npm:

```
npm install concept-net
```

To require the module in a project, we can use the expression

```
var ConceptNet = require('concept-net');
```

# Getting Started 

The module exports a single constructor which can be used to open an API connection. Simply call it an store the 
expression result in a variable:

```
var conceptNet = ConceptNet();
```

In case that you are running an own copy of the ConceptNet server, the constructor takes the hostname of the
server as an optional argument. The default option evaluates to "conceptnet5.media.mit.edu".

We can then use the following three methods to query the ConceptNet API:

## Methods 

### `.lookup(uri, [params], callback)`

This method expects a valid ConceptNet URI as its first argument. See [the documentation](https://github.com/commonsense/conceptnet5/wiki/URI-hierarchy).
Params is an (optional) object that specifies the arguments of the GET request. It can have the keys *limit*, *offset* and
*filter*. The callback function has two parameters: The *err* parameter will return error objects in case that something goes
wrong during the function invocation. If the query is successfull, *err* is `undefined` and the *result* parameter holds the result set from the query. 

Example code: 
```
conceptNet.lookup("/c/en/toast",{
	limit: 10,
	offset: 0,
	filter: "core"}, function(err, result){
	 // insert code here
	})
```

### `.search(params, callback)`

The search method takes a parameter object and hands the retrieved results to the callback function.
The official ConceptNet API documentation provides a full overview of the possible search parameters:
[ConceptNet API documentation](https://github.com/commonsense/conceptnet5/wiki/API). 

Example code: 
```
conceptNet.search({
text: "donut"}, function(err, result){
	 // insert code here
	})
```

### `.association(input, [params], callback)`

The association method takes as its first input either a valid ConceptNet URI or a `/list/<language>/<term list>`
path.

Example code: 
```
conceptNet.association("/c/en/hotdog",{
	limit: 10,
	filter: "/c/en/donut"}, function(err, result){
	 // insert code here
	})
```
