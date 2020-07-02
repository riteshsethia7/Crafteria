const mongo = require('mongoose')

const productschema = mongo.Schema({
  name : String ,
  price : Number ,
  category : String ,
  subcategory : String ,
  quantity : Number ,
  productspecifications : String ,
  Productdescription : String ,
  sellerid : String ,
  rating : { type : Number , default : 0},
  dateadded : {type : Date , default : Date.now},
  imagepath : String
});

const earningSchema = new mongo.Schema({
  sellerid : String,
  product : [productschema],
  quantity : Number,
  revenue : Number,
  datepurchased : {type:Date ,default:Date.now()}
})

module.exports = mongo.model('earning',earningSchema)
