import mongoose from"mongoose"
const { ObjectId } = mongoose.Types;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "message",
    timestamps: true,
  }
);
const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);

export default MessageModel;
