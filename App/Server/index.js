const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const app = express();
const PORT = process.env.PORT || 8000;
const messageRoutes = require("./routes/messageRoutes");
const router = require('./router');
require("dotenv").config(); 

app.use(cors());
app.use(express.json());

const server = app.listen(PORT,()=>{
  console.log(`Server started on Port number ${PORT}`);
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials : true
  }
});




// app.use(router);
app.use("/api/messages",messageRoutes)


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Mongo Connected Successfully");
}).catch((err)=>console.log(err.message))


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', ({ name, room }, callback) => {

    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}.` });
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    socket.emit('message', { user: '', text: `${user.name}, welcome to the room ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: '', text: `${user.name} has joined!` });

    socket.join(user.room);


    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });


    callback();
    const err = true;

    if (err) {
      callback({ error: 'error' })
    }
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(user, "line 60 user");

    io.to(user.room).emit('message', { user: user.name, text: message });

    io.to(user.room).emit('roomData', {room: user.room,users: getUsersInRoom(user.room)});
    
    callback();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('user disconnected');

    if (user) {
      // io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
      io.to(user.room).emit('message', { user: '', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

// server.listen(PORT, () => console.log(`server has started on port ${PORT}`));