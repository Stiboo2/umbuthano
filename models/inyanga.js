const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_155');
});

const opts = { toJSON: { virtuals: true } }; 

const InyangaSchema = new Schema({
        title:String,
        name: String,
        surname: String,
        nicName: String,
        massege: String,
        location: String,
        contact: Number,
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        images: [ImageSchema],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reviews: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Review'
                }
        ]
    
}, opts);

InyangaSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/inyanga/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});

InyangaSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Inyanga',InyangaSchema  );