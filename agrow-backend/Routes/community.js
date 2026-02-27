const express = require("express")
const router = express.Router()
const multer = require('multer')
const {setCommunity,joinCommunity,leaveCommunity,getMembers,getContent,createContent} = require("../controllers/handleCommunity")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + req.body.creatorId + '-' + file.originalname)
  }
})

const upload = multer({ storage }) 
router.post("/set",setCommunity)
router.get("/join",joinCommunity)
router.get("/leave",leaveCommunity)
router.get("/members",getMembers)
router.get("/content/",getContent)
router.post("/createContent",upload.single("media"),createContent)

module.exports = router;