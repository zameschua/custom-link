'use strict';

const express = require('express');
const app = require('./server/routes/routes')
require('dotenv').load(); // For environment variables

// Constants
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});
