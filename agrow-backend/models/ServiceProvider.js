const mongoose = require("mongoose")

const serviceProviderSchema = new mongoose.Schema({
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
        type : Number
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
    serviceList : {
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

const ServiceProvider = mongoose.model("Service Provider", serviceProviderSchema)

module.exports = ServiceProvider;

