const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/inyanga');
const Review = require('./models/review');

module.exports.isLoggedIn = (cin, cout, next) => {

    if (!cin.isAuthenticated()){
        cin.flash('error','you need to be signed in');
        return cout.redirect('/login');
    }
    next();
}
