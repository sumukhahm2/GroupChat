const cron = require('node-cron');

const Chat=require('../models/chat')
const ChatBackup=require('../models/chatBackup')
 
const CronJob=()=>{
    cron.schedule('0 0 * * *', async () => {
        console.log('Starting daily chat backup at midnight...');
    
        try {
             
            const chats = await Chat.findAll();
    
            if (chats.length === 0) {
                console.log('No chats to back up.');
                return;
            }
    
           
            const backupData = chats.map((chat) => ({
                message: chat.message,
                sendername: chat.sendername,
                groupname: chat.groupname,
                phone: chat.phone,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                authId: chat.authId,
                groupchatId: chat.groupchatId,
            }));
    
            await ChatBackup.bulkCreate(backupData);
            console.log('Chat backup completed successfully!');
        } catch (error) {
            console.error('Error during chat backup:', error);
        }
    });
    
    
}
module.exports=CronJob
