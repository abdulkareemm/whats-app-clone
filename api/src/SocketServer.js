export default function (socket) {
  /// user joins or open the application
  socket.on("join", (user) => {
    console.log("user joined",user);
    socket.join(user)
  });
  /// join a conversation
  socket.on("join conversation", (conversation)=>{
    socket.join(conversation);
    console.log("conversation",conversation)
  })
  
}
