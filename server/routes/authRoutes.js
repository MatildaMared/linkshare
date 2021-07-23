const { Router } = require("express");
const authController = require("../controllers/authController");
const router = new Router();

// Create new user
router.post("/signup", authController.signup);

// Log in user
router.post("/login", authController.login);

// Generate a token to enable changing password
router.post("/forgotpassword", authController.forgotPassword);

// Change password
router.put("/resetpassword/:resetToken", authController.resetPassword);

module.exports = router;
