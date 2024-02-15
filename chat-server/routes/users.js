var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {

  try {
    const { username, password, email } = req.body;
    const users = await User.find();
    // If email is already in use
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;
