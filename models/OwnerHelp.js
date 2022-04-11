const mongoose = require('mongoose');
const OwnerHelpSchema = new mongoose.Schema({ 

    Name:{
          type:String,
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
     DMessage:{
        type:String,
        required:true,
   },
    
})

mongoose.model('OwnerHelp',OwnerHelpSchema);