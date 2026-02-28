const express = require("express")
const router = express.Router()
const {getAllCommunities,getCommunityByQuery,getUserCommunity} = require("../controllers/handleDashboard")

router.get("/get",getCommunityByQuery)
router.get("/getall",getAllCommunities)
router.get("/userCommunity",getUserCommunity)

module.exports = router