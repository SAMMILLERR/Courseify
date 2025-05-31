const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
  console.log("inside auth middleware");
   let token=req.headers.token;
   let payload;
   console.log(token);
   try{
    payload=jwt.verify(token,process.env.JWT_SECRET);
    console.log(payload.role);
   }
   catch(e){
    console.log(e);
    res.status(400);
   }
    if (payload.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }

  req.admin = payload;
  next();

}