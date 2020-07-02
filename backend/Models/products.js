const mongo = require('mongoose');

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

module.exports = mongo.model("products",productschema) ;
