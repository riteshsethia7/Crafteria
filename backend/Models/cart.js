var mongo = require('mongoose')

const CartSchema = new mongo.Schema({
  productid : String,
  userid : String,
  productname : String,
  productqty : Number,
  productprice : Number,
  quantity : Number,
})

module.exports = mongo.model('cart',CartSchema)
