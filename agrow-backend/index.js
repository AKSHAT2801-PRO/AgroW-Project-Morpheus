// Importing Modules required for the App
const express = require('express')
const cors = require('cors')
const {connectDb} = require('./connectDb')
require('dotenv').config();

// creating the app
const app = express();
// adding middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    allowedHeaders: ["Content-Type"]
}))
app.use(express.urlencoded({ extended: false }));

// connecting MONGO DB
connectDb(process.env.MongoDB_URL)

//Defining Port
const PORT  = process.env.PORT || 8055;

// starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


