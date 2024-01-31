
import createHttpError from "http-errors";
import { createChat, doesConversationExists, populatedConversation } from "../services/conversation.service.js";
import {findUser} from "../services/user.service.js"
import { ConversationModel, UserModel } from "../models/index.js";

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
export const getConversations = async (req, res, next) => {
  try {
    const { userId } = req;
    const conversation = await getUserConversation(userId);

    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};
export const getUserConversation = async (userId) => {
  let conversation;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password -createdAt -updatedAt -__v")
    .populate("admin", "-passwor")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversation = results;
    })
    .catch((err) => {
      console.log(err);
      throw createHttpError.BadRequest("Oops... Something went wrong!");
    });
  return conversation;
};