const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const InyangaSchema = new Schema({
        name: String,
        surname: String,
        nicName: String,
        massege: String,
        location: String
    
})


module.exports = mongoose.model('Inyanga',InyangaSchema  );