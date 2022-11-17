const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const InyangaSchema = new Schema({
        title:String,
        name: String,
        surname: String,
        nicName: String,
        massege: String,
        location: String
    
})


module.exports = mongoose.model('Inyanga',InyangaSchema  );