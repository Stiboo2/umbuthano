const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_155');
});

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
    
});
module.exports = mongoose.model('Inyanga',InyangaSchema  );