const contentSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    description : {
        type : String,
        required : true 
    },
    category : {
        type : String,
        required : true
    },
    tags : {
        type : [String],
    },
    postedBy : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    },
    comments : {
        type : [String]
    },
    likes : {
        type : [String],
    },
    dislikes : {
        type : [String],
    }
    // For MVP no media is Allowed, but in future we can add media support for content
})

const Content = mongoose.model("Contents", contentSchema)

module.exports = Content;