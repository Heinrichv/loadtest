const express = require('express');
const loadtest = require('loadtest');
const loadTestOptions = require('./payload.json');

const app = express();
let counter = 0;

app.set('port', process.env.PORT || 3000);

function statusCallback(error, result, latency) {
  counter = counter + 1;
  console.log(counter + ' of ' +  loadTestOptions.maxRequests + ' requests completed')
}

let server = app.listen(app.get('port'), function () {
  console.log('Load test starting up...');
  // loadTestOptions.statusCallback = statusCallback;

  loadtest.loadTest(loadTestOptions, function (error, result) {
    if (error) return console.error('Got an error: %s', error);

    console.log('Load test complete...');
    console.log();
    console.log('Load test results', result);
    console.log();
    console.log('Stopping server...');

    process.exit(0);
  });
});

module.exports = app;
