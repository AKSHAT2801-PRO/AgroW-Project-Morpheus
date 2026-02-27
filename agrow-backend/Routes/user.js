// importing Required Modules
const express = require("express")
const router = express.Router()
const Farmer = require("../models/Farmer")
const ServiceProvider = require("../models/ServiceProvider")
const {setUserController} = require("../controllers/handleUserController")

router.post("/add",setUserController)


module.exports = router;