const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try{
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token,"this_is_a_long_secret_code_of_seller_to_hash_the_webtoken");
  next();
}
  catch(error){
    res.status(401).json({message: "auth failed"});
  }
}
