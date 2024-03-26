const express = require("express")
const router = express.Router();
const designController = require("../controllers/design-controllers");
const {authMiddleware} = require("../middleware/auth-middleware")

router
    .route("/")
    .get(designController.getDesignData)

router
    .route("/:id")
    .get(authMiddleware, designController.designDetailsData)

module.exports = router; 