const router = require('express').Router();
const libraryController = require('../controllers/libraryController');
router.get('/', libraryController.getLibrary);
router.post('/:listName', libraryController.addBookToList);
module.exports = router;