const io = require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let activeUsers = [];

io.on('connection', (socket)=>{
    socket.on('new-user-add', (newUserId)=>{
        // if user is not added previously
        if(!activeUsers.some((users)=>users.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId:socket.id
            })
        }
        io.emit('get-users',activeUsers)
    })

    //Send Message
    socket.on('send-message',(data)=>{
        console.log(data)
        if(data?.receiverId){
        const { receiverId } = data;
        const user = activeUsers.find((user)=>user?.userId === receiverId);
        // console.log("data",data)
        if(user){
            io.to(user.socketId).emit('recieve-message',data)
        }
        }
       
    })

    socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
        console.log('user disconnected',activeUsers)
        io.emit('get-users', activeUsers)
    })
})