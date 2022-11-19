const express = require('express');
const router = express.Router({ mergeParams: true });

const Inyanga = require('../models/inyanga');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateReview = (cin, cout, next) => {
    const { error } = reviewSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



router.post('/', validateReview,  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    const review = new Review(cin.body.review);
    inyanga.reviews.push(review);
    await review.save();
    await inyanga.save();
    cout.redirect(`/inyanga/${inyanga._id}`);
}))

router.delete('/:reviewId', catchAsync(async (cin, cout) => {
    const { id, reviewId } = cin.params;
    await Inyanga.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    cout.redirect(`/inyanga/${id}`);
}))

module.exports = router;