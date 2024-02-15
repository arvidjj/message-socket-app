var express = require('express');
var router = express.Router();
const { join } = require('node:path');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', authController.login);

module.exports = router;
