// importing Required Modules
const express = require("express")
const router = express.Router()
const Farmer = require("../models/Farmer")
const ServiceProvider = require("../models/ServiceProvider")
const {setUser,getUser} = require("../controllers/handleUserController")

router.get("/get",getUser)
router.post("/set",setUser)


module.exports = router;