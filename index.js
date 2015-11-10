'use strict';

var cluster = require('cluster'),
    _ = require('underscore');

var worker_type = "worker_type";

if (cluster.isMaster) {
  console.log('MASTER OF THE UNIVERSE!');
  var env = {};
  env[worker_type] =  "WORKER DATA YO";
  _(3).times(function(){
    cluster.fork(env);
  });
}
else {
  console.log("worker started, id: %j, pid: %j worker_type: %j", cluster.worker.id, process.pid, process.env[worker_type]);
}
