const express = require("express")
const router = express.Router()
const {
    likeContent,
    removeLike,
    dislikeContent,
    removeDislike,
    removeContent,
    setComment,
    removeComment,
    likeComment,
    removeLikeComment
} = require("../controllers/handleContent")

router.get("/like",likeContent)
router.get("/removeLike",removeLike)
router.get("/dislike",dislikeContent)
router.get("/removeDislike",removeDislike)
router.get("/remove",removeContent)
router.post("/comment",setComment)
router.get("/removeComment",removeComment)
router.get("/likeComment",likeComment)
router.get("/removeLikeComment",removeLikeComment)
module.exports = router