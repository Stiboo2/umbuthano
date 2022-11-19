const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { inyangaSchema, reviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Inyanga = require('./models/inyanga');
const Review = require('./models/review');

const inyanga = require('./routes/inyanga');

const dbURL = 'mongodb+srv://radebetha:0fBLL4cDEeTQcXYX@cluster0.mv1lpdh.mongodb.net/doctors?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })




const app = express();

app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const validateInyanga = (cin, cout, next) => {
    const { error } = inyangaSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateReview = (cin, cout, next) => {
    const { error } = reviewSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
app.use('/inyanga', inyanga)

app.get('/', (cin, cout) => {
    cout.render('home')
})



app.post('/inyanga/:id/reviews', validateReview,  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    const review = new Review(cin.body.review);
    inyanga.reviews.push(review);
    await review.save();
    await inyanga.save();
    cout.redirect(`/inyanga/${inyanga._id}`);
}))

app.delete('/inyanga/:id/reviews/:reviewId', catchAsync(async (cin, cout) => {
    const { id, reviewId } = cin.params;
    await Inyanga.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    cout.redirect(`/inyanga/${id}`);
}))

app.all('*', (cin, cout, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, cin, cout, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    cout.status(statusCode).render('error', { err })
})
app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000")
    })
    