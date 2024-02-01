import { ConversationModel, MessageModel } from "../models/index.js";
import  createHttpError from"http-errors"


export const createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return newMessage;
};
export const populatedMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!msg) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return msg;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return updatedConvo;
};
