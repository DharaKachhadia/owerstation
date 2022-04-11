const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

require("../models/OwnerHelp")
const Ownerhelp = mongoose.model('OwnerHelp')

router.get('/Ownerhelp',(req,res)=>{
   Ownerhelp.find().then((data)=>{
           res.status(200).json(data);
    })   
})
router.post('/Ownerhelp',async (req,res)=>{
   

    const {Name,Email,Message,DMessage } = req.body;   

    try{
   
    const OwnerHelp = new Ownerhelp({Name,Email,Message,DMessage }); 
    OwnerHelp.save();
    res.status(200).json(OwnerHelp);  
   
 }catch(err){
   return res.status(422).send(err.message)
 }
 
 
})
module.exports= router