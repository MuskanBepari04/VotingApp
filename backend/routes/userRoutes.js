const express = require('express')
const router = express.Router();
const User = require('../models/userSchema');
const {auth , generateToken} = require('../Authentication/auth');

router.post('/signup' , async(req, res)=>{
   try{
     const userData = req.body;

    const adminUser = await User.findOne({role : 'admin'})
    if(userData.role === 'admin' && adminUser){
        return res.status(409).json({message :"Already an admin is present "});
    }

    if(!/^\d{12}$/.test(userData.aadharCardNumber)){
         return res.status(400).json({message :"Adhaar Card Must Contain 12 Digits "});
    }

    const userExist = await User.findOne({aadharCardNumber : userData.aadharCardNumber})
    if(userExist){
         return res.status(409).json({message :"This Adhar Card Numbers User is already present "});
    }
    const newUser = new User(userData);
    const response = await newUser.save();

    const payload={
        id:response.id,
        role: response.role
    }

    const token = generateToken(payload);

    res.status(200).json({respone:response ,token});

   }catch(err){
   console.error("Signup error:", err.message);
res.status(500).json({message: err.message});

   }
})

router.post('/login', async(req, res)=>{
    try{
        const userData = req.body

        if(!userData.aadharCardNumber || !userData.password){
            return res.status(409).json({message :"Must Enter Aadhar Number and Password "});
        }

        const user = await User.findOne({aadharCardNumber : userData.aadharCardNumber})

        if(!user || !(await user.comparePassword(userData.password))){
            console.log('Invali Password');
            return res.status(401).json({error: 'Invalid Aadhar Card Number or Password'});
        }

        const payload={
            id:user.id,
            role: user.role
        }

        const token=generateToken(payload)

         res.status(200).json({data: user , token});

    }catch(err){
    console.log(err)
    res.status(500).json({message:err})
   }
})

router.get('/profile' ,auth , async (req,res)=>{
   try{
    const userData=req.body
    const userId = req.user.id;
    const user = await User.findById(userId);
     res.status(200).json({user});
   }catch(err){
    console.log(err)
    res.status(500).json({message:err})
   }
})

router.put('/profile/password' ,auth , async(req,res)=>{
    try{
        const {newPassword} =req.body
    const userId = req.user.id
  

    const user = await User.findById(userId)

    if(!user){
        return res.status(401).json({ error: 'Invalid User' });
    }

    user.password=newPassword
    await user.save();
    return res.status(200).json({ message: "Password Updated Successfully" });
    }catch(err){
    console.log(err)
    res.status(500).json({message:err})
   }
})

module.exports=router