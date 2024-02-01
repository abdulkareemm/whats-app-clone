import { createMessage, populatedMessage, updateLatestMessage } from "../services/message.service.js";



export const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req;
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please provider a conversation id and a message body.");
      return res.sendStatus(400);
    }
    const msgData = {
      sender: userId,
      message,
      files,
      conversation: convo_id,
    };
    let newMessage = await createMessage(msgData);

    let populateMessage = await populatedMessage(newMessage._id);

    await updateLatestMessage(convo_id, newMessage);
    res.json(populateMessage);
  } catch (error) {
    console.log(error)
    next(err);
  }
};
