const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

require("../models/help")
const Help = mongoose.model('help')

router.get('/helpdata',(req,res)=>{
   Help.find().then((data)=>{
           res.status(200).json(data);
    })   
})
router.post('/help',async (req,res)=>{
   

    const {MobileNo,Email,Message } = req.body;   

    try{
   
    const help = new Help({ MobileNo,Email,Message}); 
    help.save();
    res.status(200).json(help);  
   
 }catch(err){
   return res.status(422).send(err.message)
 }
 
 
})
module.exports= router