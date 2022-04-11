const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true     
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    contactNo:{
        type:Number,
        unique:true,
        required:true,  
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

// ownerSchema.pre('save',function(next){
//     const owner = this;
//     if(!owner.isModified('password','confirmPassword')){
//         return next()
//     }
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err){
//             return next(err)
//         }
//      bcrypt.hash(owner.password,salt,(err,hash)=>{
//          if(err){
//              return next(err)
//          }
//          owner.password = hash;
//          owner.confirmPassword = hash;
//          next()
//      })
//     })

// })


// ownerSchema.methods.comparePassword = function(candidatePassword) {
//     const owner = this;
//     return new Promise((resolve,reject)=>{
//         bcrypt.compare(candidatePassword,owner.password,(err,isMatch)=>{
//             if(err){
//                 return reject(err)
//             }
//             if (!isMatch){
//                 return reject(err)
//             }
//             resolve(true)
//         })
//     })

// }

 mongoose.model('owner',ownerSchema);