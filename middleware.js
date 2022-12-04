const { inyangaSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Inyanga = require('./models/inyanga');
const Review = require('./models/review');

module.exports.isLoggedIn = (cin, cout, next) => {
    if (!cin.isAuthenticated()){
        cin.session.returnTo = cin.originalUrl
        cin.flash('error','you need to be signed');
        return cout.redirect('/login');
    }
    next();
}

module.exports.validateInyanga = (cin, cout, next) => {
    const { error } = inyangaSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


module.exports.isAuthor = async(cin, cout, next) => {
    const { id } = cin.params;
    const inyanga = await Inyanga.findById(id);
    if(!inyanga.author.equals(cin.user._id)){
        cin.flash('error','You do not have permission to do that!');
        return cout.redirect(`/inyanga/${id}`);
    } else {
    next();
    }
}

module.exports.isReviewAuthor = async (cin, cout, next) => {
    const { id, reviewId } = cin.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(cin.user._id)) {
        cin.flash('error', 'You do not have permission to do that!');
        return cout.redirect(`/inyanga/${id}`);
    }
    next();
}

module.exports.validateReview = (cin, cout, next) => {
    const { error } = reviewSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.checkReturnTo = (cin, cout, next) => {
    if (cin.session.returnTo) {
        cout.locals.returnTo = cin.session.returnTo;
    } 
    next();
}
