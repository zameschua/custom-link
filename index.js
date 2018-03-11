'use strict';

const express = require('express');
const app = express();
const routes = require('./server/routes/routes');
require('dotenv').load(); // For environment variables

app.use('/', routes);

// Constants
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});
