const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    contentId : {
        type : String,
        required : true
    },
    commentedBy : {
        type : String,
        required : true
    },
    commentText : {
        type : String,
        required : true
    },
    commentOn : {
        type : Date,
        default : Date.now
    },
    likedBy : {
        type : [String],
        default: []
    }
})

const Comment = mongoose.model("Comments", commentSchema)
module.exports = Comment;