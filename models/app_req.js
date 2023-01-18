const mongoose= require('mongoose');
const app_reqSchema= new mongoose.Schema({
    req_id:{
        type:String,
        unique:true,
    },
    url:{
        type:String,
    },
    appTech:{
        type:String,
    },
    appType:{
        type:String,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    message:{
        type:String,
    },
    totalEstimate:{
        type:String,
    },
    numberOfPages:{
        type:String,
    },
    paymentid:{
        type:String,
    },
    payment_gateway:{
        _id:false,
        type:String,
},
    payment_status:{
        type:String,
    },
 
},{timestamps:true});
module.exports= mongoose.model('app_req',app_reqSchema);