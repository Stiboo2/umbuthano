const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const InyangaSchema = new Schema({
        title:String,
        name: String,
        surname: String,
        nicName: String,
        massege: String,
        location: String,
        contact: Number,
        image: String,
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
    
})
module.exports = mongoose.model('Inyanga',InyangaSchema  );