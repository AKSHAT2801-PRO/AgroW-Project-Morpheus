const Content = require("../models/Content");
const Comment = require("../models/Comment");
const Farmer = require("../models/Farmer");
const ServiceProvider = require("../models/ServiceProvider");
const Community = require("../models/Community");

const likeContent = async (req, res) => {
    const contentId = req.query.contentId;
    const email = req.query.email;
    const role = req.query.role;
    await Content.findByIdAndUpdate(contentId, {$push : {likes : email}}).then(() => {
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            Farmer.findOneAndUpdate({email : email}, {$push : {likedContent : contentId}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            ServiceProvider.findOneAndUpdate({email : email}, {$push : {likedContent : contentId}})
        }
    }).then(() => {
        res.status(200).json({message : "Content liked successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}   

const removeLike = async (req, res) => {
    const contentId = req.query.contentId;
    const email = req.query.email;
    const role = req.query.role;
    await Content.findByIdAndUpdate(contentId, {$pull : {likes : email}}
    ).then(() => {
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            Farmer.findOneAndUpdate({email : email}, {$pull : {likedContent : contentId}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            ServiceProvider.findOneAndUpdate({email : email}, {$pull : {likedContent : contentId}})
        }
    }).then(() => {
        res.status(200).json({message : "Like removed successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const dislikeContent = async (req, res) => {
    const contentId = req.query.contentId;
    const email = req.query.email;
    const role = req.query.role;
    await Content.findByIdAndUpdate(contentId, {$push : {dislikes : email}}
    ).then(() => {
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            Farmer.findOneAndUpdate({email : email}, {$push : {likedContent : contentId}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            ServiceProvider.findOneAndUpdate({email : email}, {$push : {likedContent : contentId}})
        }   
    }).then(() => {
        res.status(200).json({message : "Content disliked successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const removeDislike = async (req, res) => {
    const contentId = req.query.contentId;
    const email = req.query.email;
    const role = req.query.role;
    await Content.findByIdAndUpdate(contentId, {$pull : {dislikes : email}}
    ).then(() => {
        if (role === "farmer" || role === "Farmer" || role === "FARMER") {
            Farmer.findOneAndUpdate({email : email}, {$pull : {dislikedContent : contentId}})
        }
        else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
            ServiceProvider.findOneAndUpdate({email : email}, {$pull : {dislikedContent : contentId}})
        }
    }).then(() => {
        res.status(200).json({message : "Dislike removed successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}


const removeContent = async (req, res) => {
    const contentId = req.query.contentId;
    await Content.findByIdAndDelete(contentId).then(() => {
        Farmer.updateMany({likedContent : contentId}, {$pull : {likedContent : contentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
        Farmer.updateMany({dislikedContent : contentId}, {$pull : {dislikedContent : contentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        }
        );
        ServiceProvider.updateMany({likedContent : contentId}, {$pull : {likedContent : contentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        }); 
        ServiceProvider.updateMany({dislikedContent : contentId}, {$pull : {dislikedContent : contentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
        Comment.deleteMany({contentId : contentId}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
        Community.updateMany({content : contentId}, {$pull : {content : contentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }).then(() => {
        res.status(200).json({message : "Content removed successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const setComment = async (req,res) => {
    const body = req.body;
    console.log(body)
    const comment = new Comment(body);
    comment.save().then(()=>{
        Content.findByIdAndUpdate(body.contentId, {$push : {comments : comment._id}}).catch((err) => {
            res.status(500).json({message : "Internal server error1"});
        });

    })
    .then(() => {
        res.status(201).json({message : "Comment added successfully"});
    }).catch((err) => {
        res.status(500).json({message : err});
    });
}

const removeComment = async (req, res) => {
    const commentId = req.query.commentId;
    const contentId = req.query.contentId;
    await Comment.findByIdAndDelete(commentId).then(() => {
        Content.findByIdAndUpdate(contentId, {$pull : {comments : commentId}}).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }).then(() => {
        res.status(200).json({message : "Comment removed successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const likeComment = async (req, res) => {
    const commentId = req.query.commentId;
    const email = req.query.email;
    await Comment.findByIdAndUpdate(commentId, {$push : {likedBy : email}}).then(() => {
        res.status(200).json({message : "Comment liked successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

const removeLikeComment = async (req, res) => {
    const commentId = req.query.commentId;
    const email = req.query.email;
    await Comment.findByIdAndUpdate(commentId, {$pull : {likedBy : email}}).then(() => {
        res.status(200).json({message : "Like removed from comment successfully"});
    }).catch((err) => {
        res.status(500).json({message : "Internal server error"});
    });
}

module.exports = {
    likeContent,
    removeLike,
    dislikeContent,
    removeDislike,
    removeContent,
    setComment,
    removeComment,
    likeComment,
    removeLikeComment
}