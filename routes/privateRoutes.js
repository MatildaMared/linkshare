const { Router } = require("express");
const privateController = require("../controllers/privateController");
const { protectRoute } = require("../middleware/authMiddleware");
const router = new Router();

router.get("/", protectRoute, privateController.getAccess);

module.exports = router;
