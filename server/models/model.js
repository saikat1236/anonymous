const mongoose = require("mongoose");
var commentSchema = new mongoose.Schema(
    {
      comment: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
const Comment = mongoose.model("Comment", commentSchema);
var scheme = new mongoose.Schema(
  {
    post: {
      type: String,
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment" 
    }],
  },
  { timestamps: true }
);
const Userdb = mongoose.model("Userdb", scheme);
module.exports = {
  // Userdb:Userdb,
  // Comment:Comment
  Userdb,Comment
}

