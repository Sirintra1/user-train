const express = require('express');
const router = express.Router();

const userController = require('../modules/userController/userController');

router.get('/users', userController.getAll);
router.get('/user/:id', userController.getById , userController.getUserDetail);
router.put('/user', userController.update);
router.post('/user', userController.create);
router.delete('/user/:id', userController.delete);

module.exports = router;