const express = require("express")
const router = express.Router()
const {setCommunity,joinCommunity,leaveCommunity,getMembers,getContent,createContent} = require("../controllers/handleCommunity")

router.post("/set",setCommunity)
router.get("/join",joinCommunity)
router.get("/leave",leaveCommunity)
router.get("/members",getMembers)
router.get("/content/",getContent)
router.post("/createContent",createContent)

module.exports = router;