var mongo = require('mongoose');

const CartSchema = new mongo.Schema({
  productid : String,
  userid : String,
  productname : String,
  productqty : Number,
  productprice : Number,
  quantity : Number,
})
const OrderSchema = new mongo.Schema({
  USER_ID : String,
  ORDERED_ITEMS : [CartSchema] ,
  ORDER_STATUS : String ,
  TXN_AMT : Number,
  ORDER_DATE : { type: Date , default: Date.now()}
})

module.exports = mongo.model('order',OrderSchema);
