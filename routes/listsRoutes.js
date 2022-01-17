const { Router } = require("express");
const listController = require("../controllers/listsController");
const router = new Router();

// Create new list
router.post("/", listController.createList);

// Get list by id
router.get("/:listId", listController.getListById);

// Delete list
router.delete("/:listId", listController.deleteList);

// Update list
router.put("/:listId", listController.updateList);

// Add new link to list
router.post("/:listId/links", listController.addLink);

// Delete link from list
router.delete("/:listId/links/:linkId", listController.deleteLink);

module.exports = router;
