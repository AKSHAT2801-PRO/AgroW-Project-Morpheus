const Farmer = require("../models/Farmer")
const ServiceProvider = require("../models/ServiceProvider")

const getUser = async (req, res) => {
    const email = req.query.email;
    const role = req.query.role;
    if (role === "farmer" || role === "Farmer" || role === "FARMER") {
        await Farmer.findOne({email : email}).then((farmer) => {
            if (farmer) {
                res.status(200).json(farmer);
            } else {
                res.status(404).json({message : "User not found"});
            }
        }).catch((err) => {           
            res.status(500).json({message : "Internal server error"});
        });
    }
    else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
        await ServiceProvider.findOne({email : email}).then((serviceProvider) => {
            if (serviceProvider) {
                res.status(200).json(serviceProvider);  
            } else {
                res.status(404).json({message : "User not found"});
            }
        }).catch((err) => {            
            res.status(500).json({message : "Internal server error"});
        });
    }
    else { 
        res.status(400).json({message : "Invalid role"});
    }
}

const setUser = async (req, res) => {
    const body = req.body;
    const role = body.role;
    if (role === "farmer" || role === "Farmer" || role === "FARMER") {
        const farmer = new Farmer(body);
        await farmer.save().then(() => {
            res.status(201).json({message : "User created successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else if (role === "service provider" || role === "Service Provider" || role === "SERVICE PROVIDER") {
        const serviceProvider = new ServiceProvider(body);
        await serviceProvider.save().then(() => {
            res.status(201).json({message : "User created successfully"});
        }).catch((err) => {
            res.status(500).json({message : "Internal server error"});
        });
    }
    else { 
        res.status(400).json({message : "Invalid role"});
    }


}


module.exports = {setUser,
    getUser
};