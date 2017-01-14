var Promise = require('promise');

var p1 = new Promise();
p1.then(console.log);
p1.reslove(23);