const path = require('path');
const fs = require('fs');

// Construct an absolute path to trips.json
const tripsPath = path.join(__dirname, '../../data/trips.json');

// Read the JSON file
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
}

module.exports = {
    travel
}
