const path = require('path');
const fs = require('fs');

// Construct an absolute path to meals.json
const mealsPath = path.join(__dirname, '../../data/meals.json');

// Read the JSON file
const mealsJSON = JSON.parse(fs.readFileSync(mealsPath, 'utf8'));

const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', mealsJSON });
}

module.exports = {
    meals
}
