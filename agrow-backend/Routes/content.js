const express = require("express")
const router = express.Router()
const {setComment} = require("../controllers/handleComments")

router.post("/set",setComment)

module.exports = router