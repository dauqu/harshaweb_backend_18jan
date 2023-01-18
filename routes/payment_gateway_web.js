const express= require("express")
const router= express.Router();
const web_req= require("../models/website_request");
require('dotenv').config();

router.put("/:req_id", async(req, res) => {
const update_pymnt = await web_req.findOneAndUpdate( req.params.req_id, req.body );
try {
    res.send(update_pymnt)
} catch (error) {
    res.send(error)
}
})
module.exports= router;