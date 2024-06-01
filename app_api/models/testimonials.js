const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    testimonial: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: Date, required: true}
})

const Testimonial = mongoose.model('testimonials', testimonialSchema)
module.exports = Testimonial