const express = require("express");
const router = express.Router();
// const Admin = require("../models/User");
require("dotenv").config();
// const bcryptjs = require("bcryptjs");
// const cookieParser =require("cookie-parser");

//  code to logout user and clear cookies
router.get("/", async (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ msg: "logout success" });
});

module.exports = router;
