const jwt=require('jsonwebtoken')

const SECRET_KEY =process.env.JWT_SECRET;




const auth =async (req , res , next)=>{
    const authorization = req.headers.authorization
    if(!authorization) return res.status(500).json({message:"No Data in Headers"})

    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(500).json({message:"Unauthorized"});

    try{
        const decoded = jwt.verify(token , SECRET_KEY);
        req.user=decoded
        next();

    }catch(err){
         console.log("Token verification error:", err);
  return res.status(401).json({ message: "Invalid or expired token" });
    }
}

const generateToken =(userData)=>{
    return jwt.sign(userData , SECRET_KEY , { expiresIn: "1h" })
}

module.exports ={auth , generateToken}