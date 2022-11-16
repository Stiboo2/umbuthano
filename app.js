const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://radebetha:0fBLL4cDEeTQcXYX@cluster0.mv1lpdh.mongodb.net/doctors?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })




const app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (cin, cout) => {
    cout.render('home')
})


app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000")
    })
    