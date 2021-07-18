const { Router } = require("express");
const authController = require("../controllers/authController");
const router = new Router();

// Create new user
router.post("/signup", authController.signup);

// Log in user
router.post("/login", authController.login);

// Log out user
router.get("/logout", authController.logout);

module.exports = router;