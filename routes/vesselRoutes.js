const express = require('express');
const Vessel = require('../models/Vessel');
const Country = require('../models/Country');
const router = express.Router();

// Helper function to validate country and port
const isValidCountryAndPort = async (countryName, portName) => {
    const country = await Country.findOne({
        countries: countryName,
        ports: portName
    });
    return country !== null;
};

router.post('/addVessel', async (req, res) => {
    try {
      // Destructure the incoming payload
      const { type, countries, ports, records } = req.body;
  
      // Validate the incoming data
      if (!type || !Array.isArray(countries) || !Array.isArray(ports) || !Array.isArray(records)) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
  
      // Create new records in the database
      const vesselsToAdd = records.map(record => ({
        berth: record.berth,
        vesselName: record.vesselName,
        IMO: record.IMO,
        flag: record.flag,
        address: record.address,
        telephone: record.telephone,
        country: record.country,
        email: record.email,
        DPAName: record.DPAName,
        DPAMobileNo: record.DPAMobileNo,
        comments:  record.comments,
        status: record.status,
        type, // Include the vessel type
        countries, // Include the countries
        ports // Include the ports
      }));
  
      // Save all records to the database
      await Vessel.insertMany(vesselsToAdd);
  
      // Respond with success message
      return res.status(201).json({ message: 'Vessel records added successfully', vessels: vesselsToAdd });
    } catch (error) {
      console.error('Error adding vessel records:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

// GET /api/getVessel - Retrieve all vessels grouped by type
router.get('/getVessel', async (req, res) => {
    try {
        // Fetch all vessels and group by type (Inport, Expected, Roads)
        const vessels = await Vessel.find();

        const groupedVessels = {
            inport: vessels.filter(vessel => vessel.type === 'Inport'),
            expected: vessels.filter(vessel => vessel.type === 'Expected'),
            roads: vessels.filter(vessel => vessel.type === 'Roads')
        };

        res.status(200).json({
            message: "Vessels retrieved and grouped by type successfully",
            data: groupedVessels
        });
    } catch (error) {
        console.error("Error fetching vessels:", error);
        res.status(500).json({ message: "Server error while fetching vessels" });
    }
});


router.put('/updateVessel/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Find the vessel by ID and update
      const updatedVessel = await Vessel.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      });
  
      if (!updatedVessel) {
        return res.status(404).json({ message: 'Vessel not found' });
      }
  
      return res.status(200).json({ message: 'Vessel updated successfully', vessel: updatedVessel });
    } catch (error) {
      console.error('Error updating vessel record:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = router;
