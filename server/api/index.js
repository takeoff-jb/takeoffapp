const router = require('express').Router();
module.exports = router;

router.use('/data', require('./data'));
// // router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
