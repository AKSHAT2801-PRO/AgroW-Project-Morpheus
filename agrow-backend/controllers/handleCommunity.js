const Community = require("../models/Community");
const Farmer = require("../models/Farmer");
const ServiceProvider = require("../models/ServiceProvider");
const Comment = require("../models/Comment");
const Content = require("../models/Content");
const {fetchCredibility} = require("../fetchCredibility")

setCommunity = async (req, res) => {
    var body = req.body;
    const role = req.query.role;
    const email = req.query.email;
    body.members = [email];
    const community = new Community(body);
    await community.save().then(async()=>{
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            console.log(community._id)
            await Farmer.findOneAndUpdate({email : email}, {$push : {communityJoined : community._id}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            await ServiceProvider.findOneAndUpdate({email : email}, {$push : {communityJoined : community._id}})
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
    await Community.findById(communityId).then((community) => {
        if (!community) {
            res.status(404).json({message : "Community not found"});
            return;
        }
        else if (community.members.includes(email)) {
            res.status(400).json({message : "Already a member of the community"});
            return;
        }
        else {
            community.members.push(email);
            community.save()
        }
        }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
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
}

leaveCommunity = async (req, res) => {
    const communityId = req.query.communityId;
    const role = req.query.role;
    const email = req.query.email;
    await Community.findById(communityId).then((community) => {
        if (!community) {
            res.status(404).json({message : "Community not found"});
            return;
        }
        else if (community.members.includes(email)) {
            community.members.pull(email);
            community.save();
            return;
        }
        else {
           res.status(400).json({message : "Not a member of the community"});
           return;
        }
        }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
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
}

getMembers = async (req, res) => {
    const communityId = req.query.communityId; 
    console.log(communityId)
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

    // const data = {
    //     "title" : body.title,
    //     "description" : body.description
    // }
    // const credibility_data = await fetchCredibility(data);
    const credibility = 50 ;
    await Content.create({
        title,
        description,
        category,
        tags,
        userRole : role,
        postedBy,
        communityIds : [communityId],
        createdOn,
        comments,
        likes,
        dislikes,
        media,
        mediaType
    }).then((content) => {
        console.log(content._id)
        console.log(communityId)
        console.log(role)
        Community.findByIdAndUpdate(communityId, {$push : {content : content._id}}).then(()=>{
            if (role === "farmer" || role === "Farmer" || role === "FARMER") {
                Farmer.findOneAndUpdate({email : body.email}, {$push : {userContent : content._id}})
                const farmer = Farmer.findOne({email : body.email})
                const prevCred = farmer.credibilityScore  || 50;
                if (prevCred === 50) {
                    Farmer.findOneAndUpdate({email : body.postedBy}, {credibilityScore : credibility}).then(()=>{
                        res.status(201).json({message : "Content created successfully"});
                    }).catch((err) => {
                    });
                }
                else{
                    const newCred = (prevCred + credibility) / 2;
                    Farmer.findOneAndUpdate({email : body.postedBy}, {credibilityScore : newCred}).then(()=>{
                        res.status(201).json({message : "Content created successfully"});
                    }).catch((err) => {
                    });
                }
                
            }
            else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
                ServiceProvider.findOneAndUpdate({email : body.postedBy}, {$push : {userContent : content._id}})
                const servicProvider = ServiceProvider.findOne({email : body.postedBy})
                const prevCred = servicProvider.credibilityScore;
                if (prevCred === 0) {
                    ServiceProvider.findOneAndUpdate({email : body.postedBy}, {credibilityScore : credibility}).then(()=>{
                        res.status(201).json({message : "Content created successfully"});
                    }).catch((err) => {
                    });
                }
                else{
                    const newCred = (prevCred + credibility) / 2;
                    ServiceProvider.findOneAndUpdate({email : body.postedBy}, {credibilityScore : newCred}).then(()=>{
                        res.status(201).json({message : "Content created successfully"});
                    }).catch((err) => {
                    });
                }
                
            }
        }).catch((err) => {
            res.status(500).json({message : "Internal server error1"});
        });
    }).catch((err) => {
        res.status(500).json({message : "Internal server error2"});
    });
}


module.exports = {setCommunity,
    joinCommunity,
    leaveCommunity,
    getMembers,
    getContent,
    createContent

}
