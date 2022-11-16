const mongoose = require('mongoose');

var scheme = new mongoose.Schema({
    post:{
        type: String,
    },
    // comments: [
    //     {
    //         type: String
    //     }
    // ]
})

const Userdb = mongoose.model('userdb',scheme);
module.exports=Userdb ;