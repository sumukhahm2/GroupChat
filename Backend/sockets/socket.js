

const socketEvents = (io) => {
  //console.log(userGroupMap)

  const users = [];
  console.log(users)
  //console.log('const userGroupMap = new Map(); '+userGroupMap)
    io.on('connection', (socket) => {
      console.log('A user has connected! SocketId: '+socket.id );
  
      socket.on('join-group',(data)=>{
        console.log(`User ${data} is mapped to socket ID: ${socket.id}`);
        socket.join(data);
      })


      socket.on('join-chat', (data) => {
        
        console.log(data);
       
      
          socket.join(data.groupId);
        
       // socket.broadcast.to(chatroomId).emit('join-message', message);
      }); 
  
      socket.on('leave', (data) => {
        console.log(data)
        console.log(`User ${data.id} leaving group ${data.groupId}`);
        
        socket.broadcast.to(data.groupId).emit('updated-group',data)
       
      });

      socket.on('update-group',(data)=>{
        console.log(data)
        
        socket.broadcast.to(data.groupId).emit('updated-info',data)
        
      })

      socket.on('user', (data) => {
        console.log(data)
      
       
       for(let i=0;i<data.members.length;i++)
        socket.broadcast.to(data.members[i]).emit('user-info',{groupName:data.id});
         
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
        console.log(users)
        socket.broadcast.to(newMessage.groupChatId).emit('receive-message', message);
      });
    });
  };
  
  module.exports = socketEvents;
