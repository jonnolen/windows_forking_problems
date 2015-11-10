'use strict';

var cluster = require('cluster'),
    _ = require('underscore');

var worker_type = "worker_type";

if (cluster.isMaster) {
  console.log('MASTER OF THE UNIVERSE!');

  process.on('uncaughtException', function(err) {
    console.dir(err);
  });

  cluster.on('fork', function(worker){
    console.log("worker id: %j  forked", worker.id);
  });

  cluster.on('online', function(worker){
    console.log("worker id: %j online", worker.id);
  });
  
  cluster.on('exit', function(worker){
    console.log("worker id: %j exited", worker.id);
    if (!worker.suicide){
      console.log("--- it was murder.");
    }
    else{
      console.log("--- it was suicide.");
    }
  });
  
  var env = {};
  env[worker_type] =  "WORKER DATA YO";
  _(3).times(function(){
    cluster.fork(env);
  });
}
else {
  cluster.worker[worker_type] = process.env[worker_type];
  console.log("worker started, id: %j, pid: %j worker_type: %j", cluster.worker.id, process.pid, cluster.worker.worker_type);
  if (cluster.worker.id % 2 == 0){
    cluster.worker.kill(1);
  }else{
    throw new Error("let it go.");
  }
}
