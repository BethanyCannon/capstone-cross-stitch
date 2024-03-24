const express = require("express")
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`
    //path goes here (12:00 in yt)
    )
  } 
})

const upload = multer({  storage: storage });

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

    delete user.password;
    console.log(user)
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
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
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

router.post("/newuser", upload.single("image"), async (req, res) => {
  console.log(req.file)
  //not getting .jpeg
  const { first_name, last_name, email, password, confirm_password, } = req.body;
  const image = req.file.filename

  if (confirm_password !== password) {
    return res.status(400).send("passwords do not match");
  }

  if (!first_name || !last_name || !email || !password ) {
    return res.status(400).send("Please enter the required fields");
  }

  const user = await knex("user").where({ email: email }).first();
  if (user) {
    return res.status(400).send("this email is already in use");
  }

  if (!req.file) {
    return res.status(400).send("image error")
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    avatar: image,
  };

  // Insert it into our database
  try {
    await knex("user").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed registration");
  }

//stopped at 14:39
})


    // .get("/:id",)
    // .post("/:id")
    // .delete("/:id/favourites/:id")

module.exports = router; 