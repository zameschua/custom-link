'use strict';

const express = require('express');
const app = express();
const routes = require('./app/routes/routes');
app.use('/', routes);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
