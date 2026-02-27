const fs = require("fs")
const { request } = require("https")
const logger = (req,res,next)=>{
    const log = `${new Date().toISOString()} - ${req.ip} - ${req.method} - ${req.url}\n`
    fs.appendFile("logs.txt",log,(err)=>{
        if(err){
            console.error("Error writing to log file",err)
        }
    })
    next()
}

module.exports = {logger}
