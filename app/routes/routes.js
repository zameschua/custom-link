const express = require('express');
const router = express.Router();

// Testing
let database = {};

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
    database[from] = to;
    res.end("Link successfully created! customl.ink/" + from + " now links to " + to);
  })
  .put((req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    // Enter info into database
    database[from] = to;
    res.end("Link successfully updated! customl.ink/" + from + " now links to " + to);
  });

// Accessing a custom link
router.route('/:from')
  .get((req, res) => {
    res.redirect(database[req.params.from]);
  });

module.exports = router;
