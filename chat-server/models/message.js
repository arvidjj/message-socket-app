const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
