const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema({
    countries: { type: [String], required: true },
    ports: { type: [String], required: true },
    berth: { type: String }, // Optional by default, will be validated based on type
    expectedDate: { type: Date }, // Optional by default, will be validated based on type
    vesselName: { type: String, required: true },
    IMO: { type: String, required: true },
    flag: { type: String, required: true },
    address: { type: String },
    telephone: { type: String },
    country: { type: String, required: true },
    email: { type: String },
    DPAName: { type: String },
    DPAMobileNo: { type: String },
    comments: { type: String },
    status: { type: [String], required: true },
    type: { type: String, required: true, enum: ['Inport', 'Roads', 'Expected'] }, // Define the types
    created: { type: Date, default: Date.now, required: true } // Ensure created has a default value
});

module.exports = mongoose.model('Vessel', vesselSchema);
