const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const InyangaSchema = new Schema({
        Name: String,
        Surname: String,
        NicName: String,
        massege: String,
        location: String
    
})


module.exports = mongoose.model('Inyanga',InyangaSchema  );