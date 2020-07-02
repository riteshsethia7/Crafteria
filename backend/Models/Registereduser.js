const mongo = require("mongoose");
const uniqueVAlidator = require('mongoose-unique-validator');


const RegisteruserSchema = mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique:true },
  password: { type: String, required: true },
  datecreated: { type: Date, default: Date.now },
});

RegisteruserSchema.plugin(uniqueVAlidator);

module.exports = mongo.model("registeredusers", RegisteruserSchema);
