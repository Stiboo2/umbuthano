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

app.use(express.urlencoded({extended:true}))


app.get('/', (cin, cout) => {
    cout.render('home')
})


app.get('/inyanga', async (cin, cout) => {
    const inyanga = await Inyanga.find({});
    cout.render('inyanga/index', {inyanga})
})


app.get('/inyanga/new', async (cin, cout) => {
    cout.render('inyanga/new');
})

app.post('/inyanga', async (cin, cout) => {
    const inyanga = new Inyanga(cin.body.inyanga);
    await inyanga.save();
    cout.redirect(`/inyanga/${inyanga.id}`)
})

app.get('/inyanga/:id', async (cin, cout) => {
    const inyanga = await Inyanga.findById(cin.params.id);
    cout.render('inyanga/show', {inyanga});
})



app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000")
    })
    