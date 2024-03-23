const express = require("express")
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    console.log(req.headers.authorization)

    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
      }
    

    // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  if (authToken === null) {
    return res.status(401).send("Please login");
  }

  console.log(authToken)

  // Verify the token
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    // Respond with the appropriate user data
    const user = await knex("user").where({ id: decodedToken.id }).first();
    console.log(user)

    delete user.password;
    res.send(user);

  } catch (error) {
    res.status(401).send("not working");
  }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(404).send("Please enter the required fields");
      }

    // Find the user
  const user = await knex("user").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  // Validate the password
  const isPasswordCorrect = (password === user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }


  // Generate a token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
})

router.post("/newuser", async (req, res) => {
    console.log(req.body)
})


    // .get("/:id",)
    // .post("/:id")
    // .delete("/:id/favourites/:id")

module.exports = router; 