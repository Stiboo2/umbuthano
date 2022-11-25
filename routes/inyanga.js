
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
    .post(isLoggedIn, upload.array('image'), validateInyanga, catchAsync(inyanga.createInyanga))



router.get('/new',isLoggedIn, inyanga.renderNewForm)
router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.array('image'), validateInyanga, catchAsync(inyanga.updateInyanga))
    .delete(isLoggedIn, isAuthor,   catchAsync(inyanga.deleteInyanga))
    .get( catchAsync(inyanga.showInyanga));

router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(inyanga.renderEditForm))

module.exports = router;