const express = require("express");
const route = express.Router();
const services = require('../services/render')
const controller = require('../controller/controller')
const {Userdb} = require("../models/model");

// route.get('/',services.homeRoutes);

route.get("/", function (req, res, next) {

    var teamId = req.params.id;

    Userdb.find(teamId).populate("comments").exec(function(err, post) {   
        if(err){
           console.log(err);
        } else {
        //    console.log(post);
           res.render("index", {post: post });
        }
    });
});


route.post('/',services.create );
route.post('/:id/comment',services.createcom )

route.get('/users',controller.find);
// route.get('/comments',controller.findcom);

module.exports = route