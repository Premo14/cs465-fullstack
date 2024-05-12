const path = require('path');
const fs = require('fs');

// Construct an absolute path to blogs.json
const blogsPath = path.join(__dirname, '../../data/blogs.json');

// Read the JSON file
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

const index = (req, res) => {
    res.render('index', { title: "Travlr Getaways", blogs });
}

module.exports = {
    index
}
