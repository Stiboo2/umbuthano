const express = require('express');
const router = express.Router({ mergeParams: true });

const Inyanga = require('../models/inyanga');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/',isLoggedIn, validateReview,  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    const review = new Review(cin.body.review);
    review.author = cin.user._id;
    inyanga.reviews.push(review);
    await review.save();
    await inyanga.save();
    cin.flash('success', 'Created new review!');
    cout.redirect(`/inyanga/${inyanga._id}`);
}))

router.delete('/:reviewId',isLoggedIn, catchAsync(async (cin, cout) => {
    const { id, reviewId } = cin.params;
    await Inyanga.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    cin.flash('success', 'Successfully deleted review!');
    cout.redirect(`/inyanga/${id}`);
}))

module.exports = router;