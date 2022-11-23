const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { query } = require('express');
const { checkReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.get('/register',users.renderRegister);

router.post('/register', catchAsync(users.register));

router.get('/login', users.renderLogin)

router.post(
    '/login', checkReturnTo,
    passport.authenticate(  'local',   { 
        failureFlash: true, 
        failureRedirect: '/login',
        failureMessage: true,
    keepSessionInfo: true, }), 
users.login)

router.get('/logout', users.logout);



module.exports = router;