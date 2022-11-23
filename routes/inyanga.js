
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInyanga } = require('../middleware');
const inyanga = require('../controllers/inyanga');

router.route('/')
    .get(catchAsync( inyanga.index ))
    .post(isLoggedIn,validateInyanga, catchAsync(inyanga.createCampground))


router.get('/new',isLoggedIn, inyanga.renderNewForm)
router.route('/:id')
    .put(isLoggedIn, isAuthor, validateInyanga, catchAsync(inyanga.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(inyanga.deleteCampground))
    .get( catchAsync(inyanga.showCampground));

router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(inyanga.renderEditForm))

module.exports = router;