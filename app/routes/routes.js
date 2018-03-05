const connection = require('../models/models');
const express = require('express');
const router = express.Router();

// Middleware to log all HTTP requests
router.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// App
router.route('/')
  .get((req, res) => {
    res.send('Redirect to the view page later\n');
  });

// Creating a new link
router.route('/api')
  .post((req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    // Enter info into database
    connection.query(`INSERT INTO links (sourceLink, targetUrl) VALUES ('${from}', '${to}')`, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully created! customl.ink/${from} now links to ${to}`);
    });
  })
  .put((req, res) => {
    const sourceLink = req.query.from;
    const targetUrl = req.query.to;

    // Enter info into database
    connection.query(`UPDATE links SET targetUrl = '${targetUrl}' WHERE sourceLink = '${sourceLink}'`, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully updated! customl.ink/${sourceLink} now links to ${targetUrl}`);
    });
  });

// Accessing a custom link
router.route('/:from')
  .get((req, res) => {
    // Enter info into database
    connection.query(`SELECT targetUrl FROM links WHERE sourceLink = '${req.params.from}'`, function (error, results, fields) {
      if (error) throw error;
      res.redirect(results[0].targetUrl);
    });
  });

module.exports = router;
