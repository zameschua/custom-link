'use strict';

const express = require('express');
const app = express();
const routes = require('./app/routes/routes');
app.use('/', routes);

// Constants
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});
