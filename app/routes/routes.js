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
    const sourceLink = req.query.sourceLink;
    const targetUrl = req.query.targetUrl;
    const command = `
      INSERT INTO links (sourceLink, targetUrl)
      VALUES ('${sourceLink}', '${targetUrl}')
      `
    // Enter info into database
    connection.query(command, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully created! customl.ink/${sourceLink} now links to ${targetUrl}`);
    });
  })

// Accessing a custom link
router.route('/:sourceLink')
  .get((req, res) => {
    // Enter info into database
    const command = `
      SELECT targetUrl
      FROM links
      WHERE sourceLink = '${req.params.sourceLink}'
      `
    connection.query(command, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.redirect(results[0].targetUrl);
    });
  })
  /*
  .put((req, res) => {
    const sourceLink = req.query.from;
    const targetUrl = req.query.to;
    const command = `
      UPDATE links
      SET targetUrl = '${targetUrl}'
      WHERE sourceLink = '${sourceLink}'
    `
    // Enter info into database
    connection.query(command, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully updated! customl.ink/${sourceLink} now links to ${targetUrl}`);
    });
  });
*/
module.exports = router;
