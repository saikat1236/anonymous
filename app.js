const express=require("express");
const { request } = require("http");
const app=express();
const mongodb=require("mongodb");

// const dotenv=require("dotenv");
// const bodyparser = require("body-parser");
// const path = require("path")

const http=require("http").createServer(app);
const mongoclient=mongodb.MongoClient;
const objectid=mongodb.ObjectId;

// const connectDB = require('./server/database/connection');
// // connectDB();
// dotenv.config({path: "config.env"})
// const port = process.env.PORT || 3000
// app.use(bodyparser.urlencoded({extended: true}))

app.use("/views",express.static(__dirname+"/views"));
app.set("view engine","ejs");


// app.listen(port,()=>{  // do not add localhost here if you are deploying it
//     console.log("server listening to port "+port);
// });


var socketio=require("socket.io")(http);
var socketid="";
var users=[];
var mainurl="http://localhost:3000";

socketio.on("connection",function (socket) {
    console.log("user connected" , socket.id);
    socketid=socket.id;
});

http.listen(3000, function() {
    console.log("server started");
    
    mongoclient.connect("mongodb+srv://saikat:Saikat123@cluster0.1t77hko.mongodb.net/test" , function(error,client) {
        // var database=client.db("anonym");
        console.log("database connected");

        app.get("/",function(req,res) {
            result.render("index");
        });
        app.post("/addpost",function(req,res) {
            result.render("index");
            var caption=request.fields.caption;
            var _id=request.request.fields._id;
            database.collection("users").findOne(
                function(error,user) {
                    if(user==null){
                        
                    }
                }
            )
        });
              
    });
});









