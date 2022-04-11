const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
var AWS = require("aws-sdk");
const router = express.Router();
require("../models/otp");
const OTP = mongoose.model("otp");
const User = mongoose.model('User')
const jwt = require("jsonwebtoken");
const jwtKey =
  "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";

var otp = Math.floor(1000 + Math.random() * 9000);
const YOUR_MESSAGE = `Your verification code is ${otp} , please do not share this otp to anyone.`;

// GET Route
router.post("/sendOtp/:Phone",async (req, res) => {
  const Phone = req.params.Phone;
  var params = {
    Message: YOUR_MESSAGE,
    PhoneNumber: Phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "hello",
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // publishTextPromise
  //   .then(function (data) {
  //     // console.log(data)
  //     res.end(JSON.stringify({ MessageID: data.MessageId, OTP: otp }));
  //   })
  //   .catch(function (err) {
  //     res.end(JSON.stringify({ Error: err }));
  //   });
  try {
    const userOtp =  await OTP.findOneAndUpdate({Phone:Phone},{$set:{otp: otp}},{upsert: true});
    userOtp.save();
    res.send("otp is save in database");
  } catch (err) {
    res.status(500).json(err.message);
  }
});



// router.post("/VerifyOtp", async (req, res) => {
//   const user = await OTP.findOne({
//      Phone: req.body.Phone
//   });
//   if (!user) {
//     res.send("Mobile Number are not Found");
//   } else {
//     const otp = req.body.otp 
//     const dbOtp = user.otp
//     const right= "user Verified"
//     const wrong="invalid OTP"
//     if(otp === dbOtp){
//         res.send({right});       
//        }
//        else{
//         res.send({wrong});
//        }
//   }
// });

router.post("/VerifyOtp", async (req, res) => {
  try {
  const user = await OTP.findOne({
     Phone: req.body.Phone
  });
  const otp = req.body.otp 
  const dbOtp = user.otp
  if (!user) {
    res.send("Mobile Number are not Found");
  } else {    
   
    if(dbOtp === otp){
      const token = jwt.sign({ userId: user._id }, jwtKey); 
      res.status(200).json({ token });       
      
    }else{
        res.status(401).json("Wrong OTP");
       }
  }
} catch (err) {
  res.status(500).json(err.message);
}
});

router.put("/ResendOtp/:Phone",async (req, res) => {
  const Phone = req.params.Phone;
  var params = {
    Message: YOUR_MESSAGE,
    PhoneNumber: Phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "hello",
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then(function (data) {
      // console.log(data)
      res.end(JSON.stringify({ MessageID: data.MessageId, OTP: otp }));
    })
    .catch(function (err) {
      res.end(JSON.stringify({ Error: err }));
    });
  try {
    const userOtp = await OTP.findOneAndUpdate({Phone:Phone},{$set:{otp: otp}},{new: true,upsert: true});
    userOtp.save();
    res.send("otp is save in database");
  } catch (err) {

    res.status(500).json(err.message);
  }
});


module.exports = router;
