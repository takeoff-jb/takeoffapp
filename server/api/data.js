const router = require('express').Router();

module.exports = router;

// https://zoom.us/j/568516167

router.get('/', (req, res, next) => {
  res.json('Hello from the server');
});
