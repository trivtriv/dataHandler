const cluster = require('cluster');
const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config');
const rp = require('request-promise');
require('./routes')(app);

app.use('/', router);
const port = config.port || 8083;
app.listen(port, function () {
  console.log('Data Handler is listening on port 8083');
})

process.on('uncaughtException', function (err) {
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	process.exit(1);
})