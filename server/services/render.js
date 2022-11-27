const {Userdb} = require("../models/model");
const {Comment} = require("../models/model");
// const Comment = require('../models/comment');

const axios = require('axios');

// exports.homeRoutes = (req, res) => {
//     axios.get('https://unknowns.onrender.com/users')
//         .then(function (res1) {
//             res.render('index', { users: res1.data });
//             // res.redirect('/')
//         })
//         .catch(err => {
//             res.send(err);
//         });

// }
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const user = new Userdb({
        post: req.body.post
    })


    // save user in the database
    user
        .save(user)
        .then(data => {
            //   res.send(data)
            res.redirect("/")
            // console.log(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}



exports.createcom = (req, res) => {
console.log(req.body.comment)
console.log(req.params.id)
  // INSTANTIATE INSTANCE OF MODEL
  var comment = new Comment({
    comment: req.body.comment
  })
  comment.save((err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        Userdb.findById(req.params.id,(err,data)=>{
            if(err){
                console.log(err)
            }
            else {
                data.comments.unshift(result)
                data.save()
                console.log(data.comments)
                res.redirect("/")
            }
        })
       
    }
  })

//   // SAVE INSTANCE OF Comment MODEL TO DB
//   comment
//     .save()
//     .then(() => Userdb.findById(req.params.id))
//     .then((data) => {
//       data.comments.unshift(comment);
//       return data.save();
//     })
//     .then(() => res.redirect('/'))
//     .catch((err) => {
//       console.log(err);
//     });




}

