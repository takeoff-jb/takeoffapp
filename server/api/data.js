const router = require('express').Router();
const axios = require ('axios');

module.exports = router;

let apiKey = E988373257A048189740F92931B253E1

// https://zoom.us/j/568516167

router.post('/', (req, res, next) => {
  let request = req.body;
  let header = req.header;

   res.json("hello");
})

router.get('/', (req, res, next) => {
  res.json('Hello from the server');
});

function urlSearchBuilder(activity, city, state) {
  
}