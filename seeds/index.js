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
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste magni quis, dolore inventore dolorum debitis, voluptates, eaque aspernatur fuga praesentium eligendi numquam? Ipsum ex quaerat accusantium sapiente earum saepe tempore.',
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})