const express = require('express');
const router = express.Router();

const users = ["josh"];

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(users);
});

module.exports = router;
