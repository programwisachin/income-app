const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/incomeapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false" //URI of database

//Function to connect the database
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoDB"); 
    })
}

module.exports = connectToMongo;
