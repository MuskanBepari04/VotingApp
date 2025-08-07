const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Candidate = require("../models/candidateSchema");
const { auth } = require("../Authentication/auth");

router.get("/vote/:candidateId", auth, async (req, res) => {
  try{
    const userId = req.user.id;
  const candidateId = req.params.candidateId;

  const candidate = await Candidate.findById(candidateId);

  if (!candidate) {
    console.log('Candidate Not Found')
    return res.status(404).json({ message: "Candidate not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    console.log('User Not Found')
    return res.status(404).json({ message: "User not found" });
  }
  if(user.role ==='admin' || user.isVoted){
    console.log('Already Voted ')
     return res.status(404).json({ message: "Cant Vote" });
  }

  candidate.votes.push({user:userId})
  candidate.voteCount++
  await candidate.save()

  user.isVoted =true
  await user.save()

   return res.status(200).json({ message: 'Vote recorded successfully' });
  }catch(err){
    console.log(err)
    res.status(500).json({message:err})
   }

});

router.get('/count' , async (req, res)=>{
   try{
     const candidates = await Candidate.find().sort({voteCount : 'desc'})

    const voteRecord = candidates.map((data)=>{
        return{
            party : data.party,
            voteCount : data.voteCount
        }
    })

    res.status(200).json(voteRecord)
   }catch(err){
    console.log(err)
    res.status(500).json({message:err})
   }

})

module.exports = router;
