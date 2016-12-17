var dbModels = require('../db/index.js');

module.exports = function(io) {
  return function(socket) {

    console.log('a user connected');

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    //Store new message
    socket.on('msgreq:msg', function(msg) {
      console.log(msg, 'NEW MESSAGE');
      dbModels.MessagesTable.create({
        // userId: parseInt(msg.userId),
        // eventId: parseInt(msg.eventId),
        message: msg.message
      })
      .then(function() {
        console.log('MSG RECEIVED: ' + msg);
        io.emit('msgres:msg', msg);
      })
      .catch(function(err) {
        io.emit('msgres:msg', err);
      });
    });

    // Get all chat messages
    socket.on('msgreq:all', function(eventId) {
      dbModels.MessagesTable.findAll({
        where: {
          eventId: null
        }
      })
      .then(function(resp) {
        var msg = resp.reduce(function(arr, item) {
          arr.push({
            username: item.userId,
            message: item.message
          });
          return arr;
        }, []);
        console.log(msg, 'ALL MESSAGES SERVER SIDE');
        io.emit('msgres:all', msg);
      });
    });
  };
};


// var messages = [];
// io.on('connection', function(socket) {

//   console.log('a user connected');

//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });

//   socket.on('msgreq:msg', function(msg) {
//     messages.push(msg);
//     console.log('message RECEIVED: ' + msg);
//     io.emit('msgres:msg', msg);
//   });

//   socket.on('msgreq:all', function() {
//     io.emit('msgres:all', messages);
//   });

// });
