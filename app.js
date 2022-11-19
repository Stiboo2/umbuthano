const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { inyangaSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');


const inyanga = require('./routes/inyanga');
const reviews = require('./routes/reviews');

const dbURL = 'mongodb+srv://radebetha:0fBLL4cDEeTQcXYX@cluster0.mv1lpdh.mongodb.net/doctors?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })




const app = express();

app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/inyanga', inyanga)
app.use('/inyanga/:id/reviews', reviews)

app.get('/', (cin, cout) => {
    cout.render('home')
})



app.all('*', (cin, cout, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, cin, cout, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    cout.status(statusCode).render('error', { err })
})
app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000")
    })
    