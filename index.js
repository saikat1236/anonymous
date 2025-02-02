const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection');
const http = require("http");
const { Server } = require("socket.io");

dotenv.config({ path: "config.env" });

const app = express();
const port = process.env.PORT || 3000;
// const port = 3001;

// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server);



// Track connected users
let connectedUsers = 0;

// io.on("connection", (socket) => {
//     // Increment user count
//     connectedUsers++;
//     console.log("A user connected. Total users:", connectedUsers);
    
//     // Broadcast updated count to all clients
//     io.emit('userCount', connectedUsers);

//     // Handle disconnection
//     socket.on("disconnect", () => {
//         // Decrement user count
//         connectedUsers--;
//         console.log("A user disconnected. Total users:", connectedUsers);
        
//         // Broadcast updated count to all clients
//         io.emit('userCount', connectedUsers);
//     });
// });

let users = [];


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Add user to the list
    users.push(socket.id);
    
    // Emit the list of connected users to all clients
    io.emit('users', users);
    
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        
        // Remove user from the list
        users = users.filter(user => user !== socket.id);
        
        // Emit updated list of users to all clients
        io.emit('users', users);
    });

    // Handle incoming offer, answer, and candidate messages
    socket.on('offer', (offer, toSocketId) => {
        io.to(toSocketId).emit('offer', offer, socket.id);
    });

    socket.on('answer', (answer, toSocketId) => {
        io.to(toSocketId).emit('answer', answer);
    });

    socket.on('candidate', (candidate, toSocketId) => {
        io.to(toSocketId).emit('candidate', candidate);
    });
});





// Start the server
server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});

// Log requests
app.use(morgan("tiny"));

// MongoDB connection
connectDB();

// Parse requests
app.use(bodyparser.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/images', express.static(path.resolve(__dirname, "assets/images")));
app.use('/fonts', express.static(path.resolve(__dirname, "assets/fonts")));
app.use('/includes', express.static(path.resolve(__dirname, "views/includes")));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

// Routes
app.use('/', require('./server/routes/router'));

module.exports = app;