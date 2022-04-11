const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("../models/user")
const User = mongoose.model('User');
const jwtKey = "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";

module.exports = (req,res,next)=>
{
  const { authorization } = req.headers;
  //authorization === Bearer sfafsafa 
  if(!authorization){
      return res.status(401).send({error:"you must be logged in"})
  }
  const token = authorization.replace("Bearer ","");
  jwt.verify(token,jwtKey,async (err,payload)=>{
      if(err){
        return  res.status(401).send(err.message);
      }
   const {userId} = payload;
   const user = await User.findById(userId)
   req.user=user;
   next();
  })
}
