var {Userdb,Comment} = require('../models/model')

// exports.create= (req,res,next)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//       const user = new Userdb({
//         post : req.body.post
//     })


//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//             res.send(data)
//             // res.redirect("/")
//             res.render("index",{users:res.data})
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

exports.find = (req, res)=>{

    const id = req.params.id;
    if(id){

        Userdb.findById(id)
            .populate("comments")
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                res.redirect("/")

                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .populate("comments")
            .then(user => {
                res.send(user)
            // res.redirect("/")
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// exports.findcom = (req, res)=>{

//     if(req.query.id){
//         const id = req.query.id;

//         Userdb.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({ message : "Not found user with id "+ id})
//                 }else{
//                     // res.send(data)
//             res.redirect("index")

//                 }
//             })
//             .catch(err =>{
//                 res.status(500).send({ message: "Erro retrieving user with id " + id})
//             })

//     }else{
//         Userdb.find()
//             .then(user => {
//                 // res.send(user)
//             res.redirect("index")

//             })
//             .catch(err => {
//                 res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//             })
//     }

    
// }


    

