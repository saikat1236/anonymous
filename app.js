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

// Socket.IO signaling
let waitingUser = null; // Store a user waiting for a match


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Notify all users about this user
    socket.broadcast.emit("peerFound", socket.id);

    // Handle offer
    socket.on("offer", (offer, toSocketId) => {
        io.to(toSocketId).emit("offer", offer, socket.id);
    });

    // Handle answer
    socket.on("answer", (answer, toSocketId) => {
        io.to(toSocketId).emit("answer", answer);
    });

    // Handle ICE candidate
    socket.on("candidate", (candidate, toSocketId) => {
        io.to(toSocketId).emit("candidate", candidate);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        socket.broadcast.emit("peerDisconnected", socket.id);
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

// Routes
app.use('/', require('./server/routes/router'));

module.exports = app;
