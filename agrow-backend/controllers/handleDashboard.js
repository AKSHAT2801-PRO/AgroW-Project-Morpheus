const Community = require("../models/Community");
const Farmer = require("../models/Farmer");
const ServiceProvider = require("../models/ServiceProvider");
const Content = require("../models/Content");
const Comment = require("../models/Comment");


// writing handler function
const getCommunityByQuery = async (req, res) => {
    const query = req.query.query;
    await Community.find({$or : [{name : {$regex : query, $options : "i"}}, {description : {$regex : query, $options : "i"}}, {state : {$regex : query, $options : "i"}},{district : {$regex : query, $options : "i"}},{taluka : {$regex : query, $options : "i"}},{village : {$regex : query, $options : "i"}}]}).then((communities) => {
        res.status(200).json(communities);
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const getAllCommunities = async (req,res) => {
    await Community.find({}).then((communities) => {
        res.status(200).json(communities);
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}




module.exports = {
    getCommunityByQuery,
    getAllCommunities
}