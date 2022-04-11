const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtKey = "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
require("../models/station")
const Station = mongoose.model('station')


router.get('/station',(req,res)=>{
    Station.find().then((data)=>{
           res.status(200).json(data);
    })   
})

router.get('/OwnerStation/:ownerId', async (req,res)=>{     
  try{           
        const station = await Station.find({ ownerId: req.params.ownerId});
        res.status(200).json(station);
     }
  catch(err)
    {
        res.send(err.message)
    }
})
router.post('/addStation',async (req,res)=>{
   
       const { ownerId,ownerName, StationName,ContactNo,address,city,pincode,state,Plug1,Plug2,Plug3,Plug4,Plug5,openingTime,closeTime,Latitude,Longitude,Image,rating,review,Location} = req.body;   
   
       try{
      
       const station = new Station({ownerId,ownerName, StationName,ContactNo,address,city,pincode,state,Plug1,Plug2,Plug3,Plug4,Plug5,openingTime,closeTime,Latitude,Longitude,Image,rating,review,Location}); 
       station.save();
       const token = jwt.sign({userId:station._id},jwtKey)
       res.send({station})
      

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})

router.put("/StationData/update", async (req, res) => {
  try {
    const contactNo = req.body.contactNo;

    const station = await Station.findOneAndUpdate(
      { contactNo },

      {
        $set: {
          ownerName: req.body.ownerName,
          StationName: req.body.StationName,
          ContactNo: req.body.NewContactNo,
          address: req.body.address,
          city: req.body.city,
          pincode: req.body.pincode,
          state: req.body.state,
          Plug1: req.body.Plug1,
          Plug2: req.body.Plug2,
          Plug3: req.body.Plug3,
          Plug4: req.body.Plug4,
          Plug5: req.body.Plug5,
          openingTime: req.body.openingTime,
          closeTime: req.body.closeTime,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude,
          Image: req.body.Image,
          rating: req.body.rating,
          review: req.body.review,
          Location: req.body.Location,
        },
      }
    );

    station.save();
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports= router