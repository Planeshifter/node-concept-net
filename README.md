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
var cnet = require('concept-net');
```

# Getting Started 

## ConceptNet

### `.lookup(uri, [params], callback)`

### `.search(params, callback)`

### `.association(input, [params], callback)`