const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var car = new Schema({
    manufacturer: { type: String, require: true },
    model: { type: String, require: true },
    price: { type: "number", require: true }
});

module.exports = mongoose.model('cars', car);