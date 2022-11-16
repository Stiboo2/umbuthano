const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Inyanga = require('./models/inyanga');

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

app.get('/inyanga', async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
})

app.get('/', (cin, cout) => {
    cout.render('home')
})


app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000")
    })
    