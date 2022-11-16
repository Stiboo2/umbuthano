
const mongoose = require('mongoose');
const Inyanga = require('../models/inyanga');

const dbURL = 'mongodb+srv://radebetha:0fBLL4cDEeTQcXYX@cluster0.mv1lpdh.mongodb.net/doctors?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    });


    // const seedInyanga = [
    //     {
    //         name: 'Distris Khumalo',
    //         surname: '1.00',
    //         nicName: 'vegetable'
    //     },
    //     {
    //         name: 'Organic Goddess Melon',
    //         surname: 'sssss',
    //         nicName: 'fruit'
    //     },
    //     {
    //         name: 'Organic Mini Seedless Watermelon',
    //         surname: "ddd",
    //         nicName: 'fruit'
    //     },
    //     {
    //         name: 'Organic Celery',
    //         surname: "sssss",
    //         nicName: 'vegetable'
    //     },
    //     {
    //         name: 'Chocolate Whole Milk',
    //         surname: "eeeee",
    //         nicName: 'dairy'
    //     },
    // ]
    
    // Inyanga.insertMany(seedInyanga)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })


const seedDB = async () =>{
    await Inyanga.deleteMany({});
    const c = new Inyanga({name: 'RADEBE'});
    await c.save();
}

seedDB();