const express = require("express");

const router = express.Router();

const products = require("../Models/products");
const Cartdata = require("../Models/cart");
const Orderdata = require('../Models/order');

//Fetch all products of a specific seller
router.get("/server/allsellerproducts", (req, res, next) => {
  const sellerid = req.query.sellerid;
  products
    .find({ sellerid: sellerid })
    .sort({ dateadded: -1 })
    .then((data) => {
      res.status(201).json({
        message: "products fetched succesfully",
        products: data,
      });
    });
});

//Fetch a single product
router.get("/server/singleproduct", (req, res, next) => {
  const id = req.query.id;
  products.find({ _id: id }).then((data) => {
    res.status(201).json({
      message: "product added successfully",
      product: data,
    });
  });
});

//Fetch products with sorted logic
router.get("/server/sortedproducts", (req, res, next) => {
  const cat = req.query.cat;
  const subcat = req.query.subcat;
  const sortlogic = req.query.sort;
  if (subcat != "none") {
    switch (sortlogic) {
      case "lotohi":
        products
          .find({ category: cat, subcategory: subcat })
          .sort({ price: -1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "hitolo":
        products
          .find({ category: cat, subcategory: subcat })
          .sort({ price: 1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "rating":
        products
          .find({ category: cat, subcategory: subcat })
          .sort({ rating: -1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
    }
  } else if (cat != "none") {
    switch (sortlogic) {
      case "hitolo":
        products
          .find({ category: cat })
          .sort({ price: 1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "lotohi":
        products
          .find({ category: cat })
          .sort({ price: -1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "rating":
        products
          .find({ category: cat })
          .sort({ rating: 1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
    }
  } else {
    switch (sortlogic) {
      case "hitolo":
        products
          .find({})
          .sort({ price: -1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "lotohi":
        products
          .find({})
          .sort({ price: 1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
      case "rating":
        products
          .find({})
          .sort({ rating: -1 })
          .then((data) => {
            res
              .status(201)
              .json({ message: "products fetched", products: data });
          });
        break;
    }
  }
});

//Add Products to the cart
router.post("/server/addtocart", (req, res, next) => {
  const cartitem = new Cartdata({
    userid : req.body.userid,
    productid:req.body.productid,
    quantity : req.body.qty,
    productname : req.body.name,
    productqty : req.body.proqty,
    productprice : req.body.price,
  })
  cartitem.save().then(result =>{
    res.status(201).json({
      message : 'product added to cart'
    })
  })

});

//Remove product from the cart
router.delete('/server/deletedfromcart/:userid/:productid',(req,res,next)=>{
  const id = req.params.productid
  const userid = req.params.userid
  Cartdata.deleteOne({userid:userid,productid:id}).then(result => {
    res.status(200).json({
      message : "item removed"
    })
  })
})

//Fetch Cartitems
router.get("/server/cartitems",(req,res,next)=>{
  const userid = req.query.id
  Cartdata.find({userid:userid}).sort({productname: 1}).then((data)=>{
    res.status(201).json({
      message : "products fetched from cart",
      cartitems : data
    })
  })
})

//Place An Order
router.post('/server/orderplace',(req,res)=>{
  const id = req.body.id
const order = new Orderdata({
  USER_ID : id,
  ORDERED_ITEMS : req.body.cart ,
  ORDER_STATUS : req.body.status ,
  TXN_AMT : req.body.total *3
})
order.save().then(()=>{
  res.status(201).json({
    message : 'Order placed'
  })
})
})

//Clear cart items
router.delete('/server/clearcart',(req,res)=>{
  const id = req.query.id
  Cartdata.deleteMany({userid:id}).then(()=>{
    res.status(201).json({
      message : 'Cart cleared'
    })
  })
})

//Fetch Order Details
router.get('/server/orderdetails',(req,res)=>{
  const id = req.query.id
  Orderdata.find({USER_ID:id}).then((data)=>{
    res.status(201).json({
      message : 'Orders fetched',
      order : data
    })
  })
})

module.exports = router;
