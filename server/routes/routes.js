const express = require('express');
const router = express.Router();
const path = require("path");

// Connect to Postgres
const { Client } = require('pg');
const postgres = new Client({
  database : 'custom_link',
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
postgres.connect();

// Middleware to log all HTTP requests
router.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// App
router.use(express.static(path.join(__dirname, '/../../client/build')));
router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/../../client/build/index.html'));

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
    postgres.query(command, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully created! customl.ink/${sourceLink} now links to ${targetUrl}`);
      postgres.end(); // Close connection to save my heroku credits
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
    postgres.query(command, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.redirect(results[0].targetUrl);
      postgres.end(); // Close connection to save my heroku credits
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
    postgres.query(command, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully updated! customl.ink/${sourceLink} now links to ${targetUrl}`);
    });
  });
*/
module.exports = router;
