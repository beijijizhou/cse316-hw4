let express = require('express');
let router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('Main home page.');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About the main page.');
})

module.exports = router;
