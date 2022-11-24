
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInyanga } = require('../middleware');
const inyanga = require('../controllers/inyanga');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
router.route('/')
    .get(catchAsync( inyanga.index ))
    .post(isLoggedIn, upload.single('image'), validateInyanga, catchAsync(inyanga.createInyanga))


router.get('/new',isLoggedIn, inyanga.renderNewForm)
router.route('/:id')
    .put(isLoggedIn, isAuthor, validateInyanga, catchAsync(inyanga.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(inyanga.deleteCampground))
    .get( catchAsync(inyanga.showCampground));

router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(inyanga.renderEditForm))

module.exports = router;