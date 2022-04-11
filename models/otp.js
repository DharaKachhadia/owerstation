const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    
    Phone:{
        type: String,
        require:true
    },
    otp:{
        type: Number,
        require:true,
    
    }
})



 mongoose.model('otp',OtpSchema);