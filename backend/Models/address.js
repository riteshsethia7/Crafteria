var mongo = require('mongoose')

const AddressSchema = new mongo.Schema({
  userid : String,
  fullname : String,
  phoneno : String,
  line1 : String,
  line2 : String,
  landmark: String,
  city : String,
  state : String,
  country : String,
  zip :String

})

module.exports = mongo.model('address',AddressSchema)
