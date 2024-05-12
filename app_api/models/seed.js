const mongoose = require('./db')
const Trip = require('./travlr')

let fs = require('fs')
const {Mongoose} = require("mongoose");
let trips = JSON.parse(fs.readFileSync('../../data/trips.json', 'utf8'))

const seedDB = async () => {
    await Trip.deleteMany({})
    await  Trip.insertMany(trips)
}

seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0)
})
