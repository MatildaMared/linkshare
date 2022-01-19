const { Router } = require("express");
const { getUser, createUser } = require("../controllers/usersController");
const router = new Router();

// Get user data
router.route("/").get(getUser);

// Create new user
router.route("/").post(createUser);

module.exports = router;
