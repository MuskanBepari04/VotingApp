const mongoose=require('mongoose');
require('dotenv').config();

const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL)
.then(()=>{
    console.log('Database Connection Succesfull');
})
.catch((err)=>{
    console.log(err);
})

const db=mongoose.connect

module.exports=db;