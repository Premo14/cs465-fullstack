const path = require('path');
const fs = require('fs');

// Construct an absolute path to blogs.json
const testimonialsPath = path.join(__dirname, '../../data/testimonials.json')
const blogsPath = path.join(__dirname, '../../data/blogs.json')

// Read the JSON file
const testimonials = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'))
const blogs = JSON.parse(fs.readFileSync(blogsPath, "utf8"))

const index = (req, res) => {
    res.render('index', { title: "Travlr Getaways", blogs, testimonials});
}

module.exports = {
    index
}
