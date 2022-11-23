
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInyanga } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const Inyanga = require('../models/inyanga');
const inyanga = require('../controllers/inyanga');


router.get('/',catchAsync( inyanga.index ));


router.get('/new',isLoggedIn, inyanga.renderNewForm)

router.post('/', isLoggedIn,validateInyanga, catchAsync(inyanga.createCampground))

router.get('/:id',  catchAsync(inyanga.showCampground));

router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(inyanga.renderEditForm))

router.put('/:id',isLoggedIn, isAuthor, validateInyanga, catchAsync(inyanga.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(inyanga.deleteCampground));

module.exports = router;