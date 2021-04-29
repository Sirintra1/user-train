const express = require('express');
const router = express.Router();

const userController = require('../modules/userController/userController');
const phoneController = require('../modules/phoneController/phoneController');
const cinemaController = require('../modules/cinemaController/cinemaController');

router.get('/users', userController.getAll);
router.get('/user/:id', userController.getById , userController.getUserDetail);
router.put('/user', userController.update);
router.post('/user', userController.create);
router.delete('/user/:id', userController.delete);

//
router.get('/phone/brands', phoneController.getAll);
router.get('/phone/brand/:id', phoneController.getById);
router.post('/phone/brand', phoneController.createBrand);
router.put('/phone/brand', phoneController.updateBrand);
router.delete('/phone/brand/:id', phoneController.deleteBrand);
router.post('/phone/model', phoneController.createModel);
router.put('/phone/model', phoneController.updateModel);
router.delete('/phone/model/:id', phoneController.deleteModel);


router.get('/cinema/movies', cinemaController.getMovieAll);
router.get('/cinema/movie/:id', cinemaController.getMovieById);
router.post('/cinema/movie', cinemaController.createMovie);
router.put('/cinema/movie', cinemaController.updateMovie);
router.delete('/cinema/movie/:id', cinemaController.deleteMovie);
router.post('/cinema/seat', cinemaController.addSeat);
router.put('/cinema/seat', cinemaController.updateSeat);
router.delete('/cinema/seat/:id', cinemaController.deleteSeat);

module.exports = router;