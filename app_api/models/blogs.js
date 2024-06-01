const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    date: {type: Date, required: true},
    author: {type: String, required: true},
    summary: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}
})

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog
