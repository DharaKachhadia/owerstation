require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 4000;
const mongoUrl='mongodb+srv://RUTVIK_GHASKATA:rutvikghaskata@cluster0.t3mrl.mongodb.net/evspoint'
const cors = require('cors') 
const app = express()

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors())

require('./models/user');   

const userToken = require('./middleware/userToken')
const ownerToken = require('./middleware/ownerToken')
const bookingToken = require('./middleware/bookingToken')
const authRoutes = require('./routes/userapi')
const ownerRoutes = require('./routes/ownerapi')
const stationRoutes = require('./routes/stationapi')
const bookingRoutes = require('./routes/bookingapi')
const plugRoutes = require('./routes/plugapi')
const helpRoutes = require('./routes/helpapi')
const PaymentRoutes = require("./routes/paymentapi");
const otpRoutes = require("./routes/otpapi");
const OwnerHelpRoutes = require("./routes/OwnerHelpapi");
const stationRequestRoutes = require('./routes/StationRequestapi')
app.use(bodyParser.json())
app.use(authRoutes)
app.use(ownerRoutes)
app.use(stationRoutes)
app.use(bookingRoutes)
app.use(plugRoutes)
app.use(helpRoutes)
app.use(PaymentRoutes);
app.use(otpRoutes);
app.use(OwnerHelpRoutes);
app.use(stationRequestRoutes)
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept")
  
    next();
  })
mongoose.connect(mongoUrl,{
})
.then(() =>{
    console.log('connection-successful');
})
.catch((err) =>console.log('no connection'));

// app.get('/',(req, res) =>{
//     res.send("API Work Successfully"); 
// })

app.get('/',userToken,(req, res) =>{
    res.send({userId:req.user._id,firstName:req.user.firstName,lastName:req.user.lastName,email:req.user.email,contactNo:req.user.contactNo}); 
})
app.get('/book',bookingToken,(req, res) =>{
    res.send({BookingId:req.booking._id,FirstName:req.booking.FirstName,LastName:req.booking.LastName,Email:req.booking.Email,ContactNo:req.booking.ContactNo,City:req.booking.City,State:req.booking.State,Car:req.booking.Car,plug:req.booking.plug,Date:req.booking.Date,Time:req.booking.Time,Payment:req.booking.Payment}); 
})

app.get('/ownerauth',ownerToken,(req, res) =>{
    res.send({ownerId:req.owner._id,firstName:req.owner.firstName,lastName:req.owner.lastName,email:req.owner.email,contactNo:req.owner.contactNo});
})
                

app.listen(port ,()=>{
    console.log(`server is running on ${port}`);
})