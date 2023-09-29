const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/requests/:userId", userController.getEditAccessRequests);

module.exports = router;
