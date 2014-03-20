var fs      = require('fs');
var path    = require('path');
var express = require('express');
var request = require('request');

var env = process.env['NODE_ENV'];
if (env === null || env === undefined) {
  console.error("Could not load server env not set.");
  return;
}

// Variables 
var app = express(),
config  = require(['../config', process.env['NODE_ENV'], 'json'].join('.')),
isConfigFirst = (process.argv.length >= 3 && process.argv[2] === 'config-first'),
dir = isConfigFirst ? config['public'] : (process.argv[2] /* public dir */ || config['public']),
port = isConfigFirst ? config['port'] : (process.env['port'] || process.env['PORT'] || config['port']);
dir = path.normalize(__dirname + '/../' + dir);

if (port === null || port === undefined) {
  console.error("Could not configure port.");
  return;
}

if (dir === null || dir === undefined) {
  console.error("Could not configure static directory.");
  return;
}

if(config['compress']) {
  app.use(express.compress());
}
app.use(express.static(dir));

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Proxies
for (var p in config.proxies) {
  var proxy = config.proxies[p];
  if (proxy.config['api-key'] === null || proxy.config['api-key'] === undefined || proxy.config['api-key'] === "") {
    console.warn("Missing Weather Underground API Key! - using stale data...");
  }
  
  app[proxy.method](proxy.route, function(req, res) {
    var target = "";
    if(proxy.config['api-key'] !== null && proxy.config['api-key'] !== undefined && proxy.config['api-key'] !== "") {
      target = proxy.config.target.replace('{api-key}', proxy.config['api-key']);
      target += ('' + req.params[0]);
      req.pipe(request({ url: target})).pipe(res);
    } else {
      res.download(path.normalize(path.join(__dirname, proxy.config['no-api-key'], req.params[0].split('/').join('.'))));
    }
  });
}

// Start Listening on port
console.log("Starting Server on port: " + port);
app.listen(port);