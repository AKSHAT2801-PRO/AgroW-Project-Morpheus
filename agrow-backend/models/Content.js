const mongoose = require("mongoose");
const Community = require("./Community");
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
    userRole : {
        type : String,
        required : true
    },
    postedBy : {
        type : String,
        required : true
    },
    communityIds : {
        type : [String],
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
    },
    media : {
        type : String,
    },
    mediaType : {
        type : String,
    }
})

const Content = mongoose.model("Contents", contentSchema)

module.exports = Content;