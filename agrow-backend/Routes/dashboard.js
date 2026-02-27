const express = require("express")
const router = express.Router()
const {getAllCommunities,getCommunityByQuery} = require("../controllers/handleDashboard")

router.get("/get",getCommunityByQuery)
router.get("/getall",getAllCommunities)

module.exports = router