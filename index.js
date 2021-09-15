const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const open = require("open")
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
  socket.on('room', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('room', (msg) => {
    io.emit('room', msg);
  });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
   open("http://localhost:3000")
});