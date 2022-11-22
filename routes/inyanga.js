
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInyanga } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const Inyanga = require('../models/inyanga');


router.get('/',catchAsync( async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
}));


router.get('/new',isLoggedIn, (cin, cout) => {
    cout.render('inyanga/new');
})

router.post('/', isLoggedIn,validateInyanga, catchAsync( async (cin, cout) => {
    const inyanga = new Inyanga(cin.body.inyanga);
    inyanga.author = cin.user._id;
    await inyanga.save();
    cin.flash('success', 'Successfully added a new member!');
    cout.redirect(`/inyanga/${inyanga.id}`)
}))

router.get('/:id',  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(inyanga);
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }
    cout.render('inyanga/show', {inyanga});
}));

router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(async (cin, cout) => {
    const { id } = cin.params;
    const inyanga = await Inyanga.findById(id)
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }

    cout.render('inyanga/edit', {inyanga});
}))

router.put('/:id',isLoggedIn, isAuthor, validateInyanga, catchAsync(async (cin, cout) => {
    const {id} = cin.params;
    const inyanga = await Inyanga.findByIdAndUpdate(id,{...cin.body.inyanga});
    cin.flash('success', 'Successfully updated a member!');
    cout.redirect(`/inyanga/${inyanga._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (cin, cout) => {
    const { id } = cin.params;
    await Inyanga.findByIdAndDelete(id);
    cin.flash('success', 'Successfully deleted a member!');
    cout.redirect('/inyanga');
}));

module.exports = router;