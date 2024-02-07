export default function (socket) {
  /// user joins or open the application
  socket.on("join", (user) => {
    socket.join(user._id);
  });
  /// join a conversation
  socket.on("join conversation", (conversation) => {
    socket.join(conversation._id);
  });
  /// send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender_id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });
}
