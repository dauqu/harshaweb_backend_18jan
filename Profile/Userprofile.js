const express = require("express");
const router = express.Router();
const Register_Models = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//  code to check valid token and get user data
router.get("/", async (req, res) => {
  //Check user have token or not
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Register_Models.findById(decoded.user.id).select(
      "-password"
    );
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
});

module.exports = router;
