const express = require("express")
const router = express.Router();
const designController = require("../controllers/design-controllers");
const {authMiddleware} = require("../middleware/auth-middleware")

router
    .route("/")
    .get(designController.getDesignData)

router
    .route("/details/:id")
    .get(authMiddleware, designController.designDetailsData)

router
    .route("/search/:s")
    .get(designController.getSearchData)

module.exports = router; 