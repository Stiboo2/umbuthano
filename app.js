if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const inyangaRoutes = require('./routes/inyanga');
const reviewsRoutes = require('./routes/reviews');

const MongoDBStore = require("connect-mongo")(session);



const dbUrl = process.env.DB_URL_P || process.env.DB_URL
mongoose.connect(dbUrl, { useNewUrlParser: true,useUnifiedTopology: true })
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

app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';


const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'window',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((cin, cout, next) => {
    cout.locals.currentUser = cin.user;
    cout.locals.success = cin.flash('success');
    cout.locals.error = cin.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/inyanga', inyangaRoutes)
app.use('/inyanga/:id/reviews', reviewsRoutes)

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
    