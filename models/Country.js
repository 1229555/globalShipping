const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    countries: { type: String, required: true },
    ports: { type: [String], required: true }
});

module.exports = mongoose.model('Country', CountrySchema);
