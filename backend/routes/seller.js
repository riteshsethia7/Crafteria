const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg' ,
  'image/jpg' : 'jpg'
}

const imagestorage = multer.diskStorage({
  destination :  (req,file,callback) => {
    const isVAlid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isVAlid){
      error = null
    }
    callback(null, "backend/storage/productimages")
  },
  filename : (req,file,callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null , name + '.' + ext);
  }
})

const Seller = require('../Models/Registeredseller');
const products = require('../Models/products');
const Earnings = require('../Models/earning');

// Registering user in the database
router.post('/server/registerseller',(req,res,next)=>{
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const seller = new Seller({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phoneno : req.body.phoneno,
      Aadharno : req.body.Aadharno
    });
    seller
      .save()
      .then((result) => {
        res.status(201).json({
          message: "seller added succesfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
})

// Creating a jwt token for seller login
router.post("/server/loginseller", (req, res, next) => {
  let fetcheduser ;
  Seller.findOne({ email: req.body.email })
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
        { email: fetcheduser.email, userid: fetcheduser._id ,name : fetcheduser.name},
        "this_is_a_long_secret_code_of_seller_to_hash_the_webtoken",
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

//Fetching seller data
router.get('/server/sellerdata',(req,res)=>{
  const id = req.query.id
  Seller.findOne({_id : id}).then(data=>{
    res.status(201).json({
      data:data
    })
  })
})

// Adding a product from a seller
router.post("/server/addproduct",multer({storage : imagestorage}).single('image'),(req,res,next)=>{
  const url = req.protocol + '://' + req.get('host');
  const product = new products({
    name : req.body.name ,
    price : req.body.price,
    category : req.body.category ,
    subcategory : req.body.subcategory ,
    quantity : req.body.quantity ,
    productspecifications : req.body.productdetails ,
    Productdescription : req.body.productdescription ,
    sellerid : req.body.sellerid ,
    imagepath : url +'/storage/productimages/' + req.file.filename
  });
  product.save()
  .then((result) => {
    res.status(201).json({
      message: "Product Added successfuly"
    });
  })
  .catch((err)=> {
    res.status(500).json({
      error : err
    })
  })
})

// Update product
router.put('/server/updateproduct/:id',multer({storage : imagestorage}).single('image'),(req,res,next)=>{
  let imagepath = req.body.image
  if(req.file){
      const url = req.protocol + '://' + req.get('host');
      imagepath = url +'/storage/productimages/' + req.file.filename
  }
  const product = new products({
    _id : req.params.id,
    name : req.body.name ,
    price : req.body.price,
    category : req.body.category ,
    subcategory : req.body.subcategory ,
    quantity : req.body.quantity ,
    productspecifications : req.body.productdetails ,
    Productdescription : req.body.productdescription ,
    imagepath : imagepath
  });
  products.updateOne({_id:req.params.id},product).then(result =>{
    res.status(201).json({
      message: 'product updated succesfully'
    })
  })
})

//Adding products earning
router.post('/server/addearning',(req,res)=>{
  const earnproduct = new Earnings({
    sellerid : req.body.id,
  product : req.body.product,
  quantity : req.body.qty,
  revenue : req.body.revenue
  })
  earnproduct.save().then((result)=>{
    res.status(201).json({
      message : 'Seller earning updated'
    })
  })
})

//get seller earnings
router.get('/server/getsellerearnings',(req,res)=>{
  const sellerid = req.query.id
  Earnings.find({sellerid:sellerid}).then(data=>{
    res.status(201).json({
      message : 'Fetched successfully',
      data:data
    })
  })


})
module.exports = router;
