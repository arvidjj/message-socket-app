var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const passport = require('passport');
const messagesController = require('../controllers/messagesController');

router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    try {
        const messages = await Message.find();
        res.json(messages);
      } catch (error) {
        console.error('Error fetching messages from the database:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

router.post('/', async function (req, res, next) {
    try {
        const { text, user } = req.body;
        const message = new Message({
            text,
            user,
        });
        await message.save();
        res.status(201).json({ message: 'Message created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
