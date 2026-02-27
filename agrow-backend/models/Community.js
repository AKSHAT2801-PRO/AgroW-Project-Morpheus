const mongoose = require("mongoose")
const communitySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rules : {
        type : String,
        required : true
    },
    members : {
        type : [String],
        required : true 
    },
    content : {
        type : [String]
    },
    state : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    taluka : {
        type : String,
        required : true
    },
    village : {
        type : String,
        required : true
    },
    searchTags : {
        type : [String],
        required : true
    }
})

const Community = mongoose.model("Communities", communitySchema)

module.exports = Community;