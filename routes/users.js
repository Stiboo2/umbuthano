const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (cin, cout) => {
    cout.render('users/register');
});

module.exports = router;