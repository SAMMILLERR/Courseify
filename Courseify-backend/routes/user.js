const router=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require("../models/User");


router.post('/signup',async (req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please enter Data"});
    }
    const hash=await bcrypt.hash(password,10);
    try{
         const user= await User.create({email,password:hash});
         res.status(201).json({message:"user created succesfully"});
    }
    catch(e){
        res.status(400).json({ error: e.message });
    }
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not registered"});
    }
    const ok= await bcrypt.compare(password,user.password);
    if(!ok){
        res.status(400).json({message:"Password not correct"});
    }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
})
module.exports=router;