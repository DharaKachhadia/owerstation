const express = require('express')
const mongoose = require('mongoose')
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const router = express.Router();
require("../models/StationRequest")
const StationRequest = mongoose.model('StationRequest')

router.get('/stationRequestData',(req,res)=>{
   StationRequest.find().then((data)=>{
           res.status(200).json(data);
    })   
})
router.get('/stationRequest/:ownerId', async (req,res)=>{     
   try{           
         const station = await StationRequest.find({ ownerId: req.params.ownerId});
         res.status(200).json(station);
      }
   catch(err)
     {
         res.send(err.message)
     }
})
   

router.post('/addStationRequest', upload.single("image") ,async (req,res)=>{
       const result = await cloudinary.uploader.upload(req.file.path);
       const image= result.secure_url
       const { ownerId,ownerName, StationName,ContactNo,address,city,state,pincode,openingTime,closeTime,Plug,AdharCardNo} = req.body;   
       try{
       const station = new StationRequest({ownerId,ownerName, StationName,ContactNo,address,city,state,pincode,openingTime,closeTime,image,Plug,AdharCardNo}); 
       station.save();
       res.send({station})
    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})
module.exports= router