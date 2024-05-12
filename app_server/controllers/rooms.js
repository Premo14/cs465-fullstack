const path = require('path');
const fs = require('fs');

// Construct an absolute path to rooms.json
const roomsPath = path.join(__dirname, '../../data/rooms.json');

// Read the JSON file
const roomsJSON = JSON.parse(fs.readFileSync(roomsPath, 'utf8'));

const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', roomsJSON });
}

module.exports = {
    rooms
}
