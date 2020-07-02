const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Registereduser = require("../Models/Registereduser");
const address = require('../Models/address')

//Registering New user in the collection : registereduser
router.post("/server/registeruser", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new Registereduser({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user added succesfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

//Fetching Login details and checking the user and genetrating a json web token
router.post("/server/loginuser", (req, res, next) => {
  let fetcheduser ;
  Registereduser.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect Email/Password",
        });
      }
      fetcheduser = user ;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect Email/Password",
        });
      }
      const token = jwt.sign(
        { email: fetcheduser.email, userid: fetcheduser._id },
        "this_is_a_long_secret_code_to_hash_the_webtoken",
        { expiresIn: "2h" }
      );
      res.status(201).json({
        token:token,
        expiresin : 7200
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "Incorrect Email/Password",
      });
    });
});

//Fetching User info
router.get('/server/getuserdata',(req,res)=>{
  const id = req.query.id
  Registereduser.find({_id:id}).then((data)=>{
    res.status(201).json({
      message : "user fetched",
      userdata : data
    })
  })
})

//Adding address to the database of a user
router.post("/server/address",(req,res,next)=>{
  const adrs = new address({
    userid : req.body.userid,
  fullname : req.body.fullname,
  phoneno : req.body.phoneno,
  line1 : req.body.line1,
  line2 : req.body.line2,
  landmark: req.body.landmark,
  city : req.body.city,
  state : req.body.state,
  zip :req.body.zip
  })
  adrs.save() .then((result) => {
    res.status(201).json({
      message: "address added succesfully",
    });
  })
  .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
})

//fetchinf address
router.get("/server/getaddress",(req,res)=>{
  const id = req.query.id
  console.log(id)
  address.find({userid:id}).then((result)=>{
    console.log(result)
    res.status(201).json({
      message : "address found",
      address : result
    })
  })
})
module.exports = router;
