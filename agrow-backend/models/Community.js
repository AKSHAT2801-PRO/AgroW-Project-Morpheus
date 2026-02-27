const communitySchema = new mongoose.Schema({
    communityName : {
        type : String,
        required : true
    },
    communityDescription : {
        type : String,
        required : true
    },
    communityRules : {
        type : String,
        required : true
    },
    communityMembers : {
        type : [String],
        required : true 
    },
    communityContent : {
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
    communitySearchTags : {
        type : [String],
        required : true
    }
})

const Communiyt = mongoose.model("Communities", communitySchema)

module.exports = Community;