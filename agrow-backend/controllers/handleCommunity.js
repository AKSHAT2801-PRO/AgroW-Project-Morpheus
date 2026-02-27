const Community = require("../models/Community");
const Farmer = require("../models/Farmer");
const ServiceProvider = require("../models/ServiceProvider");
const Comment = require("../models/Comment");
const Content = require("../models/Content");
const {fetchCredibility} = require("../fetchCredibility")

setCommunity = async (req, res) => {
    const body = req.body;
    const role = req.query.role;
    const email = req.query.email;

    const community = new Community(body);
    await community.save().then(()=>{
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            Farmer.findOneAndUpdate({email : email}, {$push : {communityJoined : community._id}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            ServiceProvider.findOneAndUpdate({email : email}, {$push : {communityJoined : community._id}})
        }
    })
    .then(() => {
        res.status(201).json({message : "Community created successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

joinCommunity = async (req, res) => {
    const communityId = req.query.communityId;
    const role = req.query.role;
    const email = req.query.email;
    if (role === "farmer" || role === "Farmer" || role === "FARMER") {
        await Farmer.findOneAndUpdate({email : email}, {$push : {communityJoined : communityId}}).then(() => {
            res.status(200).json({message : "Joined community successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
        await ServiceProvider.findOneAndUpdate({email : email}, {$push : {communityJoined : communityId}}).then(() => {
            res.status(200).json({message : "Joined community successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else {
        res.status(400).json({message : "Invalid role"});
    }
    community.findByIdAndUpdate(communityId, {$push : {members : email}}).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

leaveCommunity = async (req, res) => {
    const communityId = req.query.communityId;
    const role = req.query.role;
    const email = req.query.email;
    if (role === "farmer" || role === "Farmer" || role === "FARMER") {
        await Farmer.findOneAndUpdate({email : email}, {$pull : {communityJoined : communityId}}).then(() => {
            res.status(200).json({message : "Left community successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
        await ServiceProvider.findOneAndUpdate({email : email}, {$pull : {communityJoined : communityId}}).then(() => {
            res.status(200).json({message : "Left community successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else {
        res.status(400).json({message : "Invalid role"});
    }
    community.findByIdAndUpdate(communityId, {$pull : {members : email}}).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

getMembers = async (req, res) => {
    const communityId = req.query.communityId; 
    await Community.findById(communityId).then((community) => {
        if (community) {
            res.status(200).json(community.members);
        } else {
            res.status(404).json({message : "Community not found"});
        }
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

getContent = async (req, res) => {
    const communityId = req.query.communityId;
    await Community.findById(communityId).then((community) => {
        if (community) {
            Content.find({_id : {$in : community.content}}).then((content) => {
                res.status(200).json(content);
            }).catch((err) => {
                res.status(500).json({message : "Internal server error"});
            });
        } else {
            res.status(404).json({message : "Community not found"});
        }
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

createContent = async (req, res) => {
    const body = req.body;
    const role = req.body.userRole;
    const title = body.title;
    const description = body.description;
    const category = body.category;
    const tags = body.tags;
    const postedBy = body.postedBy;
    const communityId = body.communityId;
    const createdOn = body.createdOn;
    const comments = body.comments;
    const likes = body.likes;
    const dislikes = body.dislikes;
    const media = req.file ? req.file.path : null;
    const mediaType = req.file ? req.file.mimetype : null;

    const data = {
        title : body.title,
        description : body.description
    }
    const credibility_data = await fetchCredibility(data);
    const credibility = credibility_data.updatedCredibility;



    await Content.create({
        title,
        description,
        category,
        tags,
        postedBy,
        communityIds : [communityId],
        createdOn,
        comments,
        likes,
        dislikes,
        media,
        mediaType
    }).then((content) => {
        Community.findByIdAndUpdate(body.communityId, {$push : {content : content._id}}).then(() => {
            res.status(201).json({message : "Content created successfully"});
        }).then(async ()=>{
            if (role === "farmer" || role === "Farmer" || role === "FARMER") {
                Farmer.findOneAndUpdate({email : body.email}, {$push : {content : content._id}})
                const farmer = await Farmer.findOne({email : body.email})
                const prevCred = farmer.credibilityScore;
                if (prevCred === 0) {
                    await Farmer.findOneAndUpdate({email : body.email}, {credibilityScore : credibility}).catch((err) => {
                        res.status(500).json({message : "Internal server error"});
                    });
                }
                else{
                    const newCred = (prevCred + credibility) / 2;
                    await Farmer.findOneAndUpdate({email : body.email}, {credibilityScore : newCred}).catch((err) => {
                        res.status(500).json({message : "Internal server error"});
                    });
                }
                
            }
            else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
                ServiceProvider.findOneAndUpdate({email : body.email}, {$push : {content : content._id}})
                const servicProvider = await ServiceProvider.findOne({email : body.email})
                const prevCred = servicProvider.credibilityScore;
                if (prevCred === 0) {
                    await ServiceProvider.findOneAndUpdate({email : body.email}, {credibilityScore : credibility}).catch((err) => {
                        res.status(500).json({message : "Internal server error"});
                    });
                }
                else{
                    const newCred = (prevCred + credibility) / 2;
                    await ServiceProvider.findOneAndUpdate({email : body.email}, {credibilityScore : newCred}).catch((err) => {
                        res.status(500).json({message : "Internal server error"});
                    });
                }
                
            }
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}


module.exports = {setCommunity,
    joinCommunity,
    leaveCommunity,
    getMembers,
    getContent,
    createContent

}
