const express = require("express");
const route = express.Router();
const services = require('../services/render')
const controller = require('../controller/controller')

route.get('/',services.homeRoutes);

route.post('/',services.create );
// route.post('/comment',services.createcom );


route.get('/users',controller.find);
// route.get('/comment',controller.findcom);





module.exports = route