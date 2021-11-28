const { Router } = require("express");
const {getUser} = require("../controllers/userController");
const router = new Router();

// Get user data
router.route("/").get(getUser);

module.exports = router;