const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");

// Connect to Postgres
const { Client } = require('pg');
const postgres = new Client({
  //database : 'custom_link',
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  //ssl: true,
});
postgres.connect();

// Middleware to log all HTTP requests
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
// Main website
app.use(express.static(path.join(__dirname, '/../../client/build')));
// Pass to API routing
app.use('/', router);

// Creating a new link
router.route('/api')
  .post((req, res) => {
    const sourceLink = req.query.sourceLink;
    const targetUrl = req.query.targetUrl;
    const command = `
      INSERT INTO links (source_link, target_url)
      VALUES ('${sourceLink}', '${targetUrl}')
      `
    // Enter info into database
    postgres.query(command, function (error, results, fields) {
      if (error) throw error;
      res.end(`Link successfully created! customl.ink/${sourceLink} now links to ${targetUrl}`);
    });
  })

// Accessing a custom link
router.route('/:sourceLink')
  .get((req, res) => {
    // Enter info into database
    const command = `
      SELECT target_url
      FROM links
      WHERE source_link = '${req.params.sourceLink}'
      `
    postgres.query(command, function (error, results, fields) {
      if (error) throw error;
      //console.log(results);
      console.log(req.params);
      res.redirect(results.rows[0].target_url);
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

module.exports = app;
