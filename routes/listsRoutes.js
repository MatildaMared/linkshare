const { Router } = require("express");
const listController = require("../controllers/listsController");
const router = new Router();

// Create new list
router.post("/", listController.createList);

// Get list by id
router.get("/:listId", listController.getListById);

module.exports = router;
