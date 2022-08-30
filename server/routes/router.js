const express = require("express");
const route = express.Router();
const services = require('../services/render')
const controller = require('../controller/controller')

app.get("/",function(req,res) {
    result.render("index");
});
app.post("/addpost",function(req,res) {
    result.render("index");
});

route.get('/',services.homeRoutes);



route.get('/add_user',services.add_user);
route.get('/form',services.form);

// route.get('/sorry',services.output);
route.get('/output',services.output);

route.get('/update_user',services.update_user);

//api
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);
module.exports = route