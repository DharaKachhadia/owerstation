const mongoose = require('mongoose');
const helpSchema = new mongoose.Schema({ 

     MobileNo:{
          type:Number,
          required:true,
     },
    Email:{
          type:String,
          required:true,
     },
     Message:{
          type:String,
          required:true,
     },
    
})

mongoose.model('help',helpSchema);