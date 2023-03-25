const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedsHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/tucamping')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("MONGO OH NO ERROR!!!");
        console.log(err);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '6419925e9f95eb31554657f6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste magni quis, dolore inventore dolorum debitis, voluptates, eaque aspernatur fuga praesentium eligendi numquam? Ipsum ex quaerat accusantium sapiente earum saepe tempore.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dsm2itjc5/image/upload/v1679740509/YelpCamp/wzbmpoek3wyv79igm2u9.jpg',
                    filename: 'YelpCamp/wzbmpoek3wyv79igm2u9'
                },
                {
                    url: 'https://res.cloudinary.com/dsm2itjc5/image/upload/v1679740509/YelpCamp/dtw5gri3qh0l8bvoe1yn.jpg',
                    filename: 'YelpCamp/dtw5gri3qh0l8bvoe1yn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})