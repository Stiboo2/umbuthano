const Inyanga = require('../models/inyanga');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
}

module.exports.renderNewForm = (cin, cout) => {
        cout.render('inyanga/new');
    }


module.exports.createInyanga =  async (cin, cout) => {
    const geoData = await geocoder.forwardGeocode({
        query:  cin.body.inyanga.location,
        limit: 1
    }).send()     
    const inyanga = new Inyanga(cin.body.inyanga);
    console.log(cin.body.inyanga.location)
    inyanga.geometry = geoData.body.features[0].geometry; 
    console.log(inyanga.geometry)
    inyanga.images = cin.files.map(f => ({ url: f.path, filename: f.filename }));
    inyanga.author = cin.user._id;
    await inyanga.save();
    cin.flash('success', 'Successfully added a new member!');
    cout.redirect(`/inyanga/${inyanga.id}`)
}

module.exports.showInyanga = async (cin, cout) => {
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

module.exports.updateInyanga =async (cin, cout) => {
    const {id} = cin.params;
    const inyanga = await Inyanga.findByIdAndUpdate(id,{...cin.body.inyanga});
    const geoData = await geocoder.forwardGeocode({
        query: cin.body.inyanga.location,
        limit: 1
    }).send()
    inyanga.geometry = geoData.body.features[0].geometry;
    const imgs = cin.files.map(f => ({ url: f.path, filename: f.filename }));
    inyanga.images.push(...imgs);
    await inyanga.save();
    if (cin.body.deleteImages) {
        for (let filename of cin.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await inyanga.updateOne({ $pull: { images: { filename: { $in: cin.body.deleteImages } } } })
    }
    cin.flash('success', 'Successfully updated a member!');
    cout.redirect(`/inyanga/${inyanga._id}`)
}

module.exports.deleteInyanga = async (cin, cout) => {
    const { id } = cin.params;
    await Inyanga.findByIdAndDelete(id);
    cin.flash('success', 'Successfully deleted a member!');
    cout.redirect('/inyanga');
}