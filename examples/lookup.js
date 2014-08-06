var ConceptNet = require("../src/store.js");
var conceptNet = new ConceptNet();

conceptNet.lookup("/c/en/toast",{
    limit: 10,
    offset: 0,
    filter: "core"}, function(err, result){
      console.log(result)
    })