const User = require('../models/user');

module.exports.renderRegister =  (cin, cout) => {
    cout.render('users/register');
}

module.exports.register =async (cin, cout, next) => {
    try {
        const { email, username, password } = cin.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        cin.login(registeredUser, err => {
            if (err) return next(err);
            cin.flash('success', 'Welcome to Yelp Enhlini Yezi Yanga!');
            cout.redirect('/inyanga');
        })
    } catch (e) {
        cin.flash('error', e.message);
        cout.redirect('register');
    }
}

module.exports.renderLogin = (cin, cout) => {
    if(cin.query.returnTo){
        cin.session.returnTo = cin.query.returnTo;
    }
        cout.render('users/login');
    }


module.exports.login =    (cin, cout) => {cin.flash('success', 'welcome back!');
const redirectUrl = cout.locals.returnTo || '/inyanga'
cout.redirect(redirectUrl);
}

module.exports.logout = (cin, cout,next) => {
    cin.logout(function (err) {
        if (err) {
            return next(err);
          }
    cin.flash('success', "Goodbye!");
    cout.redirect('/inyanga');
    });

}
module.exports.prayerschedule = (cin, cout,next) => {
    cin.flash('success', "This week Prayer Time Table");
    cout.render('users/prayerschedule');
    };