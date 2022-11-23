const Inyanga = require('../models/inyanga');
const Review = require('../models/review');

module.exports.createReview = async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    const review = new Review(cin.body.review);
    review.author = cin.user._id;
    inyanga.reviews.push(review);
    await review.save();
    await inyanga.save();
    cin.flash('success', 'Created new review!');
    cout.redirect(`/inyanga/${inyanga._id}`);
}

module.exports.deleteReview = async (cin, cout) => {
    const { id, reviewId } = cin.params;
    await Inyanga.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    cin.flash('success', 'Successfully deleted review!');
    cout.redirect(`/inyanga/${id}`);
}