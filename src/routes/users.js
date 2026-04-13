const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/duplicates', auth, userController.getDuplicates);
router.get('/:id/permissions', auth, userController.getPermissions);

module.exports = router;
