'use strict';

var cluster = require('cluster'),
    _ = require('underscore');

if (cluster.isMaster) {
  console.log('MASTER OF THE UNIVERSE!');
  _(3).times(function(){
    cluster.fork();
  });
}
else {
  console.log("worker started, id: %j, pid: %j", cluster.worker.id, process.pid);
}
