var socketio = require('socket.io');

module.exports.listen = function(app) {
    var io = socketio.listen(app);

    // initiates connection with user
    io.on('connection', function(socket) {
        console.log('connection opened');
        io.sockets.emit('from-olympus', {type: 'message', data: 'connection opened'});

        socket.on('from-zeus', function(data) {
            console.log('FROM ZEUS!', data);
        });

        // user disconnects
        socket.on('disconnect', function() {
            console.log('connection closed');
        });
    });
};
