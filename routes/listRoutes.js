const { Router } = require("express");
const listController = require("../controllers/listController");
const router = new Router();

// Create new list
router.post("/", listController.createList);

module.exports = router;
