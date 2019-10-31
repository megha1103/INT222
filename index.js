var express = require('express');
var socket = require('socket.io');   // socket need to be set up in backend as well as in frontend

// App setup
var app = express();
var server = app.listen(4000, function(){   // creating server and storing in server variable 
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));  // specifying folder public to serve

// Socket setup & pass server
var io = socket(server);  // socket is a function and it takes parameter 
io.on('connection', (socket) => {

 //defined listening of connection 
    // io.on('connection', function(socket)
    // {
    //     console.log('made socket connection', socket.id);
    // });
    // connection is an event on which callback function is fired with variablle socket
    // variable socket refers to that instance of socket which is made
    // so if we got 10 different clients all making connection each one have their own socket(with different socket ID's)
    //  between that client and server
// everytime request is made different socket id is created 

    console.log('made socket connection', socket.id);

     //when connection is established function is fired with variable socket
    //so inside that function we listen for the msg being sent to us from the client ie chat msg
    // Handle chat event

    
    socket.on('chat', function(data){

         // on chat event or msg we fired function and we recieve the data that we send
        // now we got the msg  data now we want to send it out to all
        // of the different clients connected to the server on the web socket
        // so that every one in the chat room can see the msg
        // console.log(data);
       
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);

        //io.socket refers to all of the sockets that are connected
// to the server
//we send data to all sockets

// Now in the front end we need to output it to screen

    });

});
