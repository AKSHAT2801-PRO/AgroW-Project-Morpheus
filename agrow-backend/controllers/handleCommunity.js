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

const joinCommunity = async (req, res) => {
  try {
    const { communityId, role, email } = req.query;

    if (!communityId || !role || !email)
      return res.status(400).json({ message: "Missing required fields" });

    // normalize role
    const normalizedRole = role.toLowerCase();

    // check community exists
    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    // already member?
    if (community.members.includes(email))
      return res.status(400).json({ message: "Already a member of the community" });

    // add user to community
    await Community.findByIdAndUpdate(
      communityId,
      { $addToSet: { members: email } },
      { new: true }
    );

    // update user side
    if (normalizedRole === "farmer") {
      await Farmer.findOneAndUpdate(
        { email },
        { $addToSet: { communityJoined: communityId } }
      );
    }
    else if (normalizedRole === "service provider") {
      await ServiceProvider.findOneAndUpdate(
        { email },
        { $addToSet: { communityJoined: communityId } }
      );
    }
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res.status(200).json({ message: "Joined community successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const leaveCommunity = async (req, res) => {
  try {
    const { communityId, role, email } = req.query;

    if (!communityId || !role || !email)
      return res.status(400).json({ message: "Missing required fields" });

    const normalizedRole = role.toLowerCase();

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(email))
      return res.status(400).json({ message: "Not a member of the community" });

    await Community.findByIdAndUpdate(
      communityId,
      { $pull: { members: email } },
      { new: true }
    );

    if (normalizedRole === "farmer") {
      await Farmer.findOneAndUpdate(
        { email },
        { $pull: { communityJoined: communityId } }
      );
    }
    else if (normalizedRole === "service provider") {
      await ServiceProvider.findOneAndUpdate(
        { email },
        { $pull: { communityJoined: communityId } }
      );
    }
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res.status(200).json({ message: "Left community successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

const createContent = async (req, res) => {
    const role = req.body.userRole;
    const email = req.body.postedBy;
    const content = new Content(req.body);
    content.save();
    Community.findById(req.body.communityIds[0]).then((community) => {
        community.content.push(content._id);
        community.save();
    })
    if (role === "farmer" || role === "Farmer" || role === "FARMER") {
        Farmer.findOne({email : email}).then((farmer) => {
            farmer.userContent.push(content._id);
            farmer.save();
            return res.status(201).json({message : "Content created successfully"});
        })
    }
    else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
        ServiceProvider.findOne({email : email}).then((serviceProvider) => {
            serviceProvider.userContent.push(content._id);
            serviceProvider.save();
            return res.status(201).json({message : "Content created successfully"});
        })
    }
}

module.exports = {setCommunity,
    joinCommunity,
    leaveCommunity,
    getMembers,
    getContent,
    createContent
}
