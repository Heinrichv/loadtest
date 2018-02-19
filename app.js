const express = require('express');
const loadtest = require('loadtest');
const loadTestOptions = require('./payload.json');

const app = express();
app.set('port', 3000);

let server = app.listen(app.get('port'), function () {
  console.log('Load test starting up...');
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
