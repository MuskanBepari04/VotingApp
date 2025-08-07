const express=require('express');
const app=express()
const db=require('./db.js')
app.use(express.json())
const User=require('./models/userSchema');
const userRoutes = require('./routes/userRoutes.js')
const candidateRoute = require('./routes/candidateRoute.js')
const votingRoutes = require('./routes/voteRouts.js')

const port=process.env.PORT;


const cors = require('cors')
app.use(cors())
app.use('/auth' , userRoutes)
app.use('/candidate' , candidateRoute)
app.use('/voting', votingRoutes)


app.listen(port , ()=>{
    console.log("App started on port 3000");
})