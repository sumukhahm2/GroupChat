const socketEvents = (io) => {
  console.log('initializing sockets')
    io.on('connection', (socket) => {
      console.log('A user has connected! SocketId: '+socket.id );
  
      socket.on('join', (chatroomId) => {
       
        socket.join(chatroomId);
      });
  
      socket.on('leave', (chatroomId) => {
        socket.leave(chatroomId);
      });
  
      socket.on('disconnect', () => {
        console.log(`SocketId: ${socket.id} has disconnected!`);
      });
  
      socket.on('send-message', (newMessage) => {
        console.log('Socket Messages '+newMessage.groupChatId)
        const message={
          message:newMessage.message,
          id:newMessage.id,
          phone:newMessage.phone,
          sendername:newMessage.sendername,
          createdAt:newMessage.createdAt
        }
        socket.broadcast.to(newMessage.groupChatId).emit('receive-message', message);
      });
    });
  };
  
  module.exports = socketEvents;
