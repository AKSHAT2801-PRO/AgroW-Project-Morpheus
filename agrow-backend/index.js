// Importing Modules required for the App
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const {connectDb} = require('./connectDb')
const userRouter = require('./Routes/user')
const communityRouter = require('./Routes/community')
const contentRouter = require('./Routes/content')
const dashboardRouter = require('./Routes/dashboard')
const {logger} = require("./middlewares/logs")
const path = require("path")
// creating the app
const app = express();
// adding middleware

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json(extended = true));
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    allowedHeaders: ["Content-Type"]
}))
app.use(express.urlencoded({ extended: false }));
app.use(logger)

// connecting MONGO DB
connectDb(process.env.MongoDB_URL)

// Setting Routes
app.use("/api/user",userRouter)
app.use("/api/community",communityRouter)
app.use("/api/content",contentRouter)
app.use("/api/dashboard",dashboardRouter)

//Defining Port
const PORT  = process.env.PORT || 8055;

// starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


