const express = require("express")
const router = express.Router();
const userController = require("../controllers/user-controllers");
// const knex = require("knex")(require("../knexfile"));
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`
    )
  } 
})

const upload = multer({  storage: storage });

router
  .route("/")
  .get(userController.getUserData)

router
  .route("/:id")
  .get(userController.getUserFavourites)

router
  .route("/login")
  .post(userController.loginUser)

router
  .route("/newUser")
  .post(upload.single("image"), userController.createNewUser)

router
  .route("/:Pid/favourites/:Did")
  .post(userController.newFavourite)
  .delete(userController.deleteFavourite)

    // .delete("/:id/favourites/:id")

module.exports = router; 