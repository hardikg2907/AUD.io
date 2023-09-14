const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Register a new user
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

module.exports = router;
