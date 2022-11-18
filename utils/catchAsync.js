module.exports = func => {
    return (cin, cout, next) => {
        func(cin, cout, next).catch(next);
    }
}