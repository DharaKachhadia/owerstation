const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("../models/booking")
const Booking = mongoose.model('booking')
const jwtKey = "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";

module.exports = (req,res,next)=>
{
  const { authorization } = req.headers;
  //authorization === Bearer sfafsafa
  if(!authorization){
      return res.status(401).send({error:"you must be logged in"})
  }
  const token1 = authorization.replace("Bearer ","");
  jwt.verify(token1,jwtKey,async (err,payload)=>{
      if(err){
        return  res.status(401).send(err.message);
      }
   const {bookingId} = payload;
   const booking = await Booking.findById(bookingId)
   req.booking=booking;
   next();
  })
}