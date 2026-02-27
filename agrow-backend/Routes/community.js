const express = require("express")
const router = express.Router()
const {setCommunity} = require("../controllers/handleCommunity")

router.post("/add",setCommunity)

module.exports = router;