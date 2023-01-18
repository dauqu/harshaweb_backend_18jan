const express= require("express");
const router = express.Router();
const contactSchema = require("../models/contact");

//add contact user
router.post("/", async(req,res) =>{

    const {fname, lname, email, phone}= req.body;
    //check if email is valid
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Email is not valid" });
    

  //check if phone number is valid const phoneRegex = /^\d{10}$/;
     const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phone)) return res.status(400).json({message:"Phone number must be 10 digits long"});
    console.log(phone);

     //check if fname is valid
     const fnameRegex = /^[a-zA-Z ]{2,30}$/;
     if(!fnameRegex.test(fname)) return res.status(400).json({message:"Name is not valid"});
    
     //check if lname is valid
     const lnameRegex = /^[a-zA-Z ]{2,30}$/;
     if(!lnameRegex.test(lname)) return res.status(400).json({message:"Name is not valid"});
     

    const contact_collection= new contactSchema({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        phone:req.body.phone,
        service:req.body.service,
        subject:req.body.subject,
        message:req.body.message,
    });
    try {
        await contact_collection.save();
        res.status(201).json("Contact user added");
       
    } catch (error) {
        res.status(400).send(error);
    }
})

//get a contact user
router.get("/:id", async(req,res) =>{
    const contact_collection= await contactSchema.findById(req.params.id);
    try {
        res.send(contact_collection);
    } catch (error) {
        res.status
    }
});

//get all contact users
router.get("/", async(req,res) =>{
    const contact_collection= await contactSchema.find();
    try {
        res.send(contact_collection);
    } catch (error) {
        res.status
    }
});

//validation for contact user
async function validation (req,res, next){
    const { fname, email,phone, message }= req.body;
    if(fname === undefined || fname === null || fname === "" ||
    email === undefined || email === null || email === "" ||
    phone === undefined || phone === null || phone === "" ||
    message === undefined || message === null || message === ""){
        return res.status(400).json("Firstname, email, phone, message  is required");
    }
    next();
}

module.exports= router;