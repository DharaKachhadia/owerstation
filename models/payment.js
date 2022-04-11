const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    
    UserId:{
        type: String,
        require:true
    },
    StationId:{
        type: String,
        require:true
    },
    UserName:{
        type: String,
        require:true
    },
    StationName:{
        type: String,
        require:true,
    },
    Amount:{
        type: Number,
        require:true,
    }
})

 mongoose.model('Payments',PaymentSchema);