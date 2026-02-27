const express = require("express")
const router = express.Router()
const {getAllCommunities} = require("../controllers/handleDashboard")

router.get("/allcommunities",getAllCommunities)

module.exports = router