const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

if(authToken === "null") {
    req.user = null;
    next();
    return;
}



console.log("header", authHeader)
console.log("token", authToken)

  try{
  const payload = jwt.verify(authToken, process.env.JWT_KEY);

    const getFavourites = await knex("favourites").where({ user_id: payload.id })
      req.user = getFavourites
      next();
  }catch(error){
      res.status(401).json({
          message: `Error retrieving user: ${error}`,
        })
  }
  }

  module.exports = { authMiddleware };