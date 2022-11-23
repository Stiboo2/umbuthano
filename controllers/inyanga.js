const Inyanga = require('../models/inyanga');

module.exports.index = async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
}

module.exports.renderNewForm = (cin, cout) => {
        cout.render('inyanga/new');
    }


module.exports.createCampground =  async (cin, cout) => {
    const inyanga = new Inyanga(cin.body.inyanga);
    inyanga.author = cin.user._id;
    await inyanga.save();
    cin.flash('success', 'Successfully added a new member!');
    cout.redirect(`/inyanga/${inyanga.id}`)
}

module.exports.showCampground = async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }
    cout.render('inyanga/show', {inyanga});
}

module.exports.renderEditForm = async (cin, cout) => {
    const { id } = cin.params;
    const inyanga = await Inyanga.findById(id)
    if (!inyanga) {
        cin.flash('error', 'Cannot find that member!');
        return cout.redirect('/inyanga');
    }

    cout.render('inyanga/edit', {inyanga});
}

module.exports.updateCampground =async (cin, cout) => {
    const {id} = cin.params;
    const inyanga = await Inyanga.findByIdAndUpdate(id,{...cin.body.inyanga});
    cin.flash('success', 'Successfully updated a member!');
    cout.redirect(`/inyanga/${inyanga._id}`)
}

module.exports.deleteCampground = async (cin, cout) => {
    const { id } = cin.params;
    await Inyanga.findByIdAndDelete(id);
    cin.flash('success', 'Successfully deleted a member!');
    cout.redirect('/inyanga');
}