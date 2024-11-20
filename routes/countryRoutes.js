const express = require('express');
const Country = require('../models/Country');
const router = express.Router();

// Add a country with ports
router.post('/addCountry', async (req, res) => {
    const { countries, ports } = req.body;

    // Validate required fields
    if (!countries || !ports || !Array.isArray(ports)) {
        return res.status(400).json({ message: 'Country name and ports are required' });
    }

    try {
        // Create and save the new country entry
        const newCountry = new Country({ countries, ports });
        await newCountry.save();
        res.status(201).json({ message: 'Country added successfully' });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get all countries with ports
router.get('/countriesList', async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
