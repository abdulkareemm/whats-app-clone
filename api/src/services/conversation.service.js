import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const doesConversationExists = async (sender_id, receiver_id) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      {
        users: { $elemMatch: { $eq: sender_id } },
        users: { $elemMatch: { $eq: receiver_id } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  if (!convos) throw createHttpError.BadRequest("Oops.. Something wrong.");

  // populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });
  return convos[0];
};
export const createChat = async (data) => {
  let newConvo = await ConversationModel.create(data);
  if (!newConvo) {
    throw createHttpError.BadRequest("Oops... Something went wrong!");
  }
  return newConvo;
};
export const populatedConversation = async (id, fieldToPopulate, fieldsToRemove) => {
  const populatedConvo = await ConversationModel.findById(id).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops.. Something went wrong !");
  return populatedConvo;
};
