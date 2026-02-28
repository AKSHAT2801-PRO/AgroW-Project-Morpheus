const mongoose = require("mongoose")

const farmersSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        default : 0
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    credibilityScore : {
        type : Number,
        default : 50
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
    cropList : {
        type : [String],
        required : true
    },
    interestedIn : {
        type : [String],
        required : true
    },
    communityJoined : {
        type : [String],
        required : true
    },
    userContent : {
        type : [String],

    },
    likedContent : {
        type : [String]
    },
    dislikedContent : {
        type : [String]
    }
})

const Farmer = mongoose.model("farmers", farmersSchema)

module.exports = Farmer;

