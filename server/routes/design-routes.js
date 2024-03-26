const express = require("express")
const router = express.Router();
const designController = require("../controllers/design-controllers");

router
    .route("/")
    .get(designController.getDesignData)

router
    .route("/:id")
    .get(designController.designDetailsData)

module.exports = router; 