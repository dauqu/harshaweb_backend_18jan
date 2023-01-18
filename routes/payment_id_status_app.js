const express= require("express")
const router= express.Router();
const app_req= require("../models/app_req");
require('dotenv').config();

router.put("/:req_id", async(req, res) => {
const update_pymnt = await app_req.findOneAndUpdate( req.params.req_id, req.body );
try {
    res.send(update_pymnt)
} catch (error) {
    res.send(error)
}
})
module.exports= router;