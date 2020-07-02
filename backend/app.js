const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')

const userRoutes = require('./routes/user');
const sellerRoutes = require('./routes/seller');
const displayproducts = require('./routes/displayproducts');

const mongourl = "mongodb://127.0.0.1:27017/crafteria";

const app = express();

//Connecting to Mongo Database
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("connection to mongo failed");
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/storage/productimages',express.static(path.join('backend/storage/productimages')))

//Allowing CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use(userRoutes);
app.use(sellerRoutes);
app.use(displayproducts);

module.exports = app;
