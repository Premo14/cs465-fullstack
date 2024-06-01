const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    rate: {type: Number, required: true}
})

const Room = mongoose.model('rooms', roomSchema)
module.exports = Room