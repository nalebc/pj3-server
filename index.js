const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io =  require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const db = require("./database.service")
const open = require("open")
app.get('/', (req, res) => {
  console.log(db.getUsers())
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
  socket.on('chat message', (msg) => {
    console.log( msg)
         socket.broadcast.emit("chat message",(msg));
  });

});
server.listen(9200, () => {
  console.log('listening on *:9200');
  db.start()
});
