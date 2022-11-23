const Userdb =require("../models/model");

const axios=require('axios');

exports.homeRoutes = (req,res)=>{
    axios.get('https://unknowns.onrender.com/users')
    .then(function(res1){
        res.render('index',{users: res1.data});
        // res.redirect('/')
    })
    .catch(err=>{
        res.send(err);
    });
    
}
exports.create= (req,res)=>{
  // validate request
  if(!req.body){
      res.status(400).send({ message : "Content can not be emtpy!"});
      return;
  }

  // new user
    const user = new Userdb({
      post : req.body.post
  })


  // save user in the database
  user
      .save(user)
      .then(data => {
        //   res.send(data)
          res.redirect("/")
          // console.log(data)
      })
      .catch(err =>{
          res.status(500).send({
              message : err.message || "Some error occurred while creating a create operation"
          });
      });

}

// exports.createcom= (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }
  
//     // new user
//       const user = new Userdb({
//         comments : req.body.comment
//     })
  
  
//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//           //   res.send(data)
//             res.redirect("/")
//             // console.log(data)
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });
  
//   }

