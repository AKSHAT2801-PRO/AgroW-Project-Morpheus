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
    commentLikes : {
        type : [String]
    }
})

const Comment = mongoose.model("Comments", commentSchema)
module.exports = Comment;