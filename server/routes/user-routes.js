const express = require("express")
const router = express.Router();
const userController = require("../controllers/user-controllers");
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
  .patch(upload.single("avatar"), userController.editUser)
  .delete(userController.deleteUser)

router
  .route("/login")
  .post(userController.loginUser)

router
  .route("/newUser")
  .post(upload.single("avatar"), userController.createNewUser)

router
  .route("/:Pid/favourites/:Did")
  .post(userController.newFavourite)
  .delete(userController.deleteFavourite)

    // .delete("/:id/favourites/:id")

module.exports = router; 