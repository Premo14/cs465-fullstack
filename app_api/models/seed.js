const mongoose = require('./db')
const Trips = require('./travlr')
const Blogs = require('./blogs')
const Meals = require('./meals')
const Rooms = require('./rooms')
const Testimonials = require('./testimonials')

let fs = require('fs')
let trips = JSON.parse(fs.readFileSync('../../data/trips.json', 'utf8'))
let blogs = JSON.parse(fs.readFileSync('../../data/blogs.json', 'utf8'))
let meals = JSON.parse(fs.readFileSync('../../data/meals.json', 'utf8'))
let rooms = JSON.parse(fs.readFileSync('../../data/rooms.json', 'utf8'))
let testimonials = JSON.parse(fs.readFileSync('../../data/testimonials.json', 'utf8'))

const seedDB = async () => {
    await Trips.deleteMany({})
    await  Trips.insertMany(trips)

    await Blogs.deleteMany({})
    await  Blogs.insertMany(blogs)

    await Meals.deleteMany({})
    await  Meals.insertMany(meals)

    await Rooms.deleteMany({})
    await  Rooms.insertMany(rooms)

    await Testimonials.deleteMany({})
    await  Testimonials.insertMany(testimonials)
}

seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0)
})
