
const messagesController = {};
const Message = require('../models/message');

messagesController.createMessage = async (data) => {
    try {
        console.log(data)
        const { body, userId } = data;
        const message = new Message({
            body,
            userId,
            time: Date.now(),
        });
        await message.save();
    } catch (error) {
        console.error(error);
    }
}


module.exports = messagesController;
