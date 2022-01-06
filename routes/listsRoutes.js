const { Router } = require("express");
const listController = require("../controllers/listsController");
const router = new Router();

// Create new list
router.post("/", listController.createList);

module.exports = router;
