const io = require('socket.io')(8000);
var users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
   // console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
   // console.log(message);
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });

  




});
