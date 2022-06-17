
const server = require('http').createServer();
// const { userJoin, getcurrentUser } = require('./user')
const { LocalStorage } = require("node-localstorage");

import db from "./models";
const Group = db["Group"];

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
io.on('connection', (socket: any) => {
  console.log('user connected...!!!!')
  // socket.join(data.room);
  const groups = getallGroup()
  for (const item of groups) {
    socket.join(item.room);

  }

  socket.on('join', async function (data: any, callback: any) {
    //joining
    console.log('soketid', socket.id);
    const user = userJoin(socket.id, data.user, data.room)

    socket.join(data.room);

    console.log(data.user + 'joined this Group : ' + data.user);
    socket.broadcast.to(data.room).emit('new-user-joined', { user: data.user, message: 'join this Group.', room: data.room });
    //Validation for all the required fields
    if (data) {
      const group = await Group.findOne({
        where: {
          groupName: data.room,
          status: 1
        },
      });
      if (group) {
        let joinMsg: string;
        if (group.previousChat) {
          const msgdata = group.previousChat
          const previousChat = JSON.parse(msgdata)
          previousChat.push({ user: data.user, message: 'join this Group.', room: data.room });
          joinMsg = JSON.stringify(previousChat);
        } else {
          joinMsg = JSON.stringify([{ user: data.user, message: 'join this Group.', room: data.room }])
        }

        let updateChat = await Group.update({
          previousChat: joinMsg
        }, {
          where: {
            groupName: data.room,
          }
        })
      }

    }
  });




  socket.on('leave', function (data: any) {

    console.log(data.user + 'left the room : ' + data.room);

    io.sockets.in(data.room).emit('left room', { user: data.user, message: 'has left this room.' });

    socket.leave(data.room);
  });

  socket.on('message', async function (data: any) {
    console.log('socket.id', socket.id);
    // const user = getcurrentUser.getCurrentUser(socket.id)
    let newData: any = { user: data.user, message: data.message, room: data.room }
    if (data.file) {
      newData.filename = data.file 
      io.in(data.room).emit('new message', newData);

    } else {
      io.in(data.room).emit('new message', newData);
    }
    if (data) {
      const group = await Group.findOne({
        where: {
          groupName: data.room,
          status: 1
        },
      });
      if (group) {
        let chatMsg: any
        if (group.previousChat) {
          const msgdata = group.previousChat
          const previousChat = JSON.parse(msgdata)
          previousChat.push(newData);
          chatMsg = JSON.stringify(previousChat);
        }

        let updateChat = await Group.update({
          previousChat: chatMsg
        }, {
          where: {
            groupName: data.room,
          }
        })
      }

    }
  })
});
server.listen(3000);


const Socket = {
  emit: function (event: any, data: any) {
    // console.log(event, data)

    // console.log(event, data)
    // console.log('data', data);
    io.in(data.room).emit(event, { user: data.user, message: data.massage });
  },

  emitData: function (event: any, data: any) {
    // console.log(event, data)

    // console.log(event, data)
    // console.log('data', data);
    io.emit(event, data);
  }
}

function userJoin(id: any, username: any, room: any) {
  const user = { id, username, room }
  // users.push(user)
  var localStorage = new LocalStorage('./scratch');

  let joinUser: any = localStorage.getItem('joinUser');
  console.log('joinUser', joinUser);
  if (joinUser) {
    joinUser = JSON.parse(joinUser)
    joinUser.push(user)
    localStorage.setItem('joinUser', JSON.stringify(joinUser));

  } else {
    console.log('user', user)
    localStorage.setItem('joinUser', JSON.stringify([user]));

  }
  return user;
}
function getallGroup() {
  // users.push(user)
  var localStorage = new LocalStorage('./scratch');

  let joinUser: any = localStorage.getItem('joinUser');

  joinUser = JSON.parse(joinUser)


  return joinUser;
}

exports.Socket = Socket;
exports.io = io;
