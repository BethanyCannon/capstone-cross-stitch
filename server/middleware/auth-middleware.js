const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));


const authMiddleware = async (req, res, next) => {
  //check to see if header is sent
if(req.headers.authorization === undefined || !req.headers.authorization){
    req.user = null;
    next();
    return
}

const authHeader = req.headers.authorization;
const authToken = authHeader.split(" ")[1];

//check to ensure token exists
if(authToken === "null") {
    req.user = null;
    next();
    return;
}

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