
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
// const seedDB = async () =>{
//     await Inyanga.deleteMany({});
   
// }


    const seedInyanga = [
        {
            author: '637bdadce1237730b2bbaa73',
            title: 'District',
            name: 'Thabo',
            surname: 'Khumalo',
            nicName: 'The challenger',
            image: 'https://www.istockphoto.com/photo/leading-his-team-to-success-gm173269341-25708994',
            massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',

        },
        {
            author: '637bdadce1237730b2bbaa73',
            title: 'District',
            name: 'Goba',
            surname: 'Sethole',
            nicName: 'Dubula',
            image: 'https://source.unsplash.com/collection/483551',
            massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        },
        {
            author: '637bdadce1237730b2bbaa73',
            title: 'District',
            name: 'Jonh',
            surname: "Nene",
            nicName: 'Mkhumbi',
            image: 'https://www.istockphoto.com/photo/close-up-of-doctor-smiling-gm840806462-137028909',
            massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        },
        {
            author: '637bdadce1237730b2bbaa73',
            title: 'District',
            name: 'tom',
            surname: "Sebotsa",
            nicName: 'angle',
            Image: 'https://www.istockphoto.com/photo/his-brain-is-set-to-big-ideas-gm956878830-261274016',
            massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        },
        {
            author: '637bdadce1237730b2bbaa73',
            title: 'District',
            name: 'Mike',
            surname: "Baloyi",
            nicName: 'misic Man',
            image: 'https://unsplash.com/photos/C5yfbvMWxC8',
            massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        },
    ]
    
    Inyanga.insertMany(seedInyanga)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
     })


// const seedDB = async () =>{
//     await Inyanga.deleteMany({});
//     const c = new Inyanga({name: 'RADEBE'});
//     await c.save();
// }

//seedDB();