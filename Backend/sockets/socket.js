const socketEvents = (io) => {
    io.on('connection', (socket) => {
      console.log(`A user has connected! SocketId: ${socket.id}`);
  
      socket.on('join', (chatroomId) => {
        socket.join(chatroomId);
      });
  
      socket.on('leave', (chatroomId) => {
        socket.leave(chatroomId);
      });
  
      socket.on('disconnect', () => {
        console.log(`SocketId: ${socket.id} has disconnected!`);
      });
  
      socket.on('newMessage', (newMessage) => {
        socket.broadcast.to(newMessage.chatroomId).emit('addMessage', newMessage);
      });
    });
  };
  
  module.exports = socketEvents;
