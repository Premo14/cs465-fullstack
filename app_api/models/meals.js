const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [itemSchema],
    image: { type: String, required: true }
});

const Meal = mongoose.model('meals', mealSchema);
module.exports = Meal;
