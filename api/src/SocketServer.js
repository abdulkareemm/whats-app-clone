let OnlineUsers = [];

export default function (socket, io) {
  /// user joins or open the application
  socket.on("join", (user) => {
    socket.join(user._id);
    // add user to online users
    if (!OnlineUsers.some((u) => u.userId === user._id)) {
      OnlineUsers.push({ userId: user._id, socketId: socket.id });
    }
    //  send online users to frontend
    io.emit("get-online-users", OnlineUsers);
  });
  socket.on("disconnect", () => {
    OnlineUsers = OnlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", OnlineUsers);
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
