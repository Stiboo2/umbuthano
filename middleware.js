const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/inyanga');
const Review = require('./models/review');

module.exports.isLoggedIn = (cin, cout, next) => {
    if (!cin.isAuthenticated()){
        cin.session.returnTo = cin.originalUrl
        console.log("cin.originalUrl")
        console.log(cin.originalUrl)
        console.log("cin.session.returnTo")
        console.log(cin.session.returnTo)
        cin.flash('error','you need to be signed in');
        return cout.redirect('/login');
    }
    next();
}
