const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

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

router.get('/login', (req, res) => {
    res.render('users/login');
})


module.exports = router;