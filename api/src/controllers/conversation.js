
import createHttpError from "http-errors";
import { createChat, doesConversationExists, populatedConversation } from "../services/conversation.service.js";
import {findUser} from "../services/user.service.js"

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.userId;
    const { receiver_id } = req.body;
    if (!receiver_id) {
      logger.error(
        "please provide the user id you wanna start a conversation with !"
      );
      throw createHttpError.BadGateway("Something went wrong!");
    }

    // check if chat exists
    const existed_conversation = await doesConversationExists(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let reciver_user = await findUser(receiver_id);
      let convoData = {
        name: reciver_user.name,
        picture: reciver_user.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createChat(convoData);
      const populatedConvo = await populatedConversation(
        newConvo._id,
        "users",
        "-password"
      );

      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};