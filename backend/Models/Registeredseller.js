const mongo = require('mongoose');
const uniqueVAlidator = require('mongoose-unique-validator');


const RegisteredsellerSchema = mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique:true },
  password: { type: String, required: true },
  phoneno: { type : String, required:true, unique:true},
  datecreated: { type: Date, default: Date.now },
  Aadharno: { type:String , required:true,unique:true}
});

RegisteredsellerSchema.plugin(uniqueVAlidator);

module.exports = mongo.model("registeredseller", RegisteredsellerSchema);
