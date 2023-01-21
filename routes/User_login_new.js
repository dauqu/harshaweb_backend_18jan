require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
const UserSchema = require("./../models/User");

router.use(cookiParser());

// code to login user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.cookie("auth_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({  msg: "login success", token ,user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// check valid token
router.get("/check_valid_token", async (req, res) => {
  //Check user have token or not
  const token =
    req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token == undefined || token == null || token == "") {
    return res.json(false);
  }

  const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET);

  if (!have_valid_tokem) {
    return res.json(false);
  }

  const id_from_token = have_valid_tokem.id;

  //Check Same id have database
  const user = await UserSchema.findOne({ id_from_token }).lean();

  if (user == undefined || user == null || user == "") {
    res.json(false);
  } else {
    res.json(true);
  }
});

// check token id is same with user id
router.get("/checkLogin", (req, res) => {
  try {
    const have_valid_token = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    // get user id from token
    const id_from_token = have_valid_token.id;

    // check same id have same database
    const user_id = User.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
