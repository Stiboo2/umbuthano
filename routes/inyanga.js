
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { inyangaSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Inyanga = require('../models/inyanga');

const validateInyanga = (cin, cout, next) => {
    const { error } = inyangaSchema.validate(cin.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/',catchAsync( async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
}));


router.get('/new', async (cin, cout) => {
    cout.render('inyanga/new');
})

router.post('/',validateInyanga, catchAsync( async (cin, cout) => {
    const inyanga = new Inyanga(cin.body.inyanga);
    await inyanga.save();
    cin.flash('success', 'Successfully added a new member!');
    cout.redirect(`/inyanga/${inyanga.id}`)
}))

router.get('/:id',  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id).populate('reviews');
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }
    cout.render('inyanga/show', {inyanga});
}));

router.get('/:id/edit',  catchAsync(async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }
    cout.render('inyanga/edit', {inyanga});
}))

router.put('/:id', validateInyanga, catchAsync(async (cin, cout) => {
    const {id} = cin.params;
    const inyanga = await Inyanga.findByIdAndUpdate(id,{...cin.body.inyanga});
    cin.flash('success', 'Successfully updated a member!');
    cout.redirect(`/inyanga/${inyanga.id}`)
}));

router.delete('/:id', catchAsync(async (cin, cout) => {
    const { id } = cin.params;
    await Inyanga.findByIdAndDelete(id);
    cin.flash('success', 'Successfully deleted a member!');
    cout.redirect('/inyanga');
}));

module.exports = router;