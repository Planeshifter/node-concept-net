[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]

ConceptNet
===============

node.js interface to the ConceptNet semantic network API. For further information, consult the website of the project:
[http://conceptnet5.media.mit.edu/](http://conceptnet5.media.mit.edu/).


# Introduction

The ConceptNet package can be easily installed via npm:

```
npm install concept-net
```

To require the module in a project, we can use the expression:

```javascript
var ConceptNet = require( 'concept-net' );
```

# Getting Started

The module exports a single constructor which can be used to open an API connection. Simply call it an store the
expression result in a variable:

```javascript
var conceptNet = ConceptNet();
```

In case that you are running an own copy of the ConceptNet server, the constructor takes the hostname of the
server as an optional argument. The default option evaluates to "conceptnet5.media.mit.edu:80".

```javascript
ConceptNet( '<hostname>', '<port>', '<conceptnet version number>' );
```

Example:
```javascript
var conceptNet = ConceptNet( '10.0.0.1', '10053', '5.3' );
```
Note you can modify only the version by just passing null to the first two arguments:

```javascript
var conceptNet = ConceptNet( null, null, '5.3' );
```

We can then use the following three methods to query the ConceptNet API:

## Methods

### `.lookup( uri[, params], callback )`

This method expects a valid ConceptNet URI as its first argument. See [the documentation](https://github.com/commonsense/conceptnet5/wiki/URI-hierarchy).
Params is an (optional) object that specifies the arguments of the GET request. It can have the keys *limit*, *offset* and
*filter*. The callback function has two parameters: The *err* parameter will return error objects in case that something goes
wrong during the function invocation. If the query is successful, *err* is `undefined` and the *result* parameter holds the result set from the query.

Example code:
```javascript
conceptNet.lookup( '/c/en/toast', {
	limit: 10,
	offset: 0,
	filter: 'core'
}, function onDone( err, result ) {
	// insert code here
})
```

### `.getURI( text[, language], callback )`

This method finds out what the [ConceptNet URI](https://github.com/commonsense/conceptnet5/wiki/API#uri-standardization) is for a given text, applying steps such as reducing English words to their root form. The `language` parameter can be supplied a code for the language to use. If only two arguments are supplied, `language` is set to the default value `en`.

Example code:
```javascript
conceptNet.getURI( 'ground beef', 'en', function onDone( err, result ) {
	// insert code here
})
```

### `.search( params, callback )`

The search method takes a parameter object and hands the retrieved results to the callback function.
The official ConceptNet API documentation provides a full overview of the possible search parameters:
[ConceptNet API documentation](https://github.com/commonsense/conceptnet5/wiki/API#search).

Example code:
```javascript
conceptNet.search({
	start: '/c/en/donut'
}, function onDone( err, result ) {
	// insert code here
})
```

### `.association( input[, params], callback )`

The association method takes as its first input either a valid ConceptNet URI or a `/list/<language>/<term list>`
path.

Example code:
```javascript
conceptNet.association( '/c/en/hotdog', {
	limit: 10,
	filter: '/c/en/donut'
}, function onDone( err, result ){
	// insert code here
})
```

## Unit Tests

Run tests via the command `npm test`

---
## License

[MIT license](http://opensource.org/licenses/MIT).

[npm-image]: https://badge.fury.io/js/concept-net.svg
[npm-url]: http://badge.fury.io/js/concept-net

[travis-image]: https://travis-ci.org/Planeshifter/node-concept-net.svg
[travis-url]: https://travis-ci.org/Planeshifter/node-concept-net

[coveralls-image]: https://img.shields.io/coveralls/Planeshifter/node-concept-net/master.svg
[coveralls-url]: https://coveralls.io/r/Planeshifter/node-concept-net?branch=master

[dependencies-image]: http://img.shields.io/david/Planeshifter/node-concept-net.svg
[dependencies-url]: https://david-dm.org/Planeshifter/node-concept-net
