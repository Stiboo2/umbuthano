const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { query } = require('express');
const { checkReturnTo } = require('../middleware');

router.get('/register', (cin, cout) => {
    cout.render('users/register');
});

router.post('/register', catchAsync(async (cin, cout, next) => {
    try {
        const { email, username, password } = cin.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        cin.login(registeredUser, err => {
            if (err) return next(err);
            cin.flash('success', 'Welcome to Yelp Enhlini Yezi Yanga!');
            cout.redirect('/inyanga');
        })
    } catch (e) {
        cin.flash('error', e.message);
        cout.redirect('register');
    }
}));

router.get('/login', (cin, cout) => {
if(cin.query.returnTo){
    cin.session.returnTo = cin.query.returnTo;
}

    cout.render('users/login');
})

router.post(
    '/login', checkReturnTo,
    passport.authenticate(  'local',   { 
        failureFlash: true, 
        failureRedirect: '/login',
        failureMessage: true,
    keepSessionInfo: true, }), 
    (cin, cout) => {cin.flash('success', 'welcome back!');
    const redirectUrl = cout.locals.returnTo || '/inyanga'
    cout.redirect(redirectUrl);
})

router.get('/logout', (cin, cout,next) => {
    cin.logout(function (err) {
        if (err) {
            return next(err);
          }
    cin.flash('success', "Goodbye!");
    cout.redirect('/inyanga');
    });
});



module.exports = router;