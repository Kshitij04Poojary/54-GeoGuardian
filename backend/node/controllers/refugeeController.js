const Refugee = require('../models/refugee');

// Get all refugee entries
exports.getAllRefugees = async (req, res) => {
    try {
        const refugees = await Refugee.find();
        res.status(200).json(refugees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching refugee data", error });
    }
};

// Get a single refugee entry by ID
exports.getRefugeeById = async (req, res) => {
    try {
        const refugee = await Refugee.findOne({ id: req.params.id });
        if (!refugee) return res.status(404).json({ message: "Refugee not found" });

        res.status(200).json(refugee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching refugee data", error });
    }
};

// Create a new refugee entry
exports.createRefugee = async (req, res) => {
    try {
        const { id, areaname, location, disaster } = req.body;
        const newRefugee = new Refugee({ id, areaname, location, disaster });
        
        await newRefugee.save();
        res.status(201).json({ message: "Refugee data added successfully", refugee: newRefugee });
    } catch (error) {
        res.status(500).json({ message: "Error creating refugee data", error });
    }
};

// Update a refugee entry by ID
exports.updateRefugee = async (req, res) => {
    try {
        const updatedRefugee = await Refugee.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });

        if (!updatedRefugee) return res.status(404).json({ message: "Refugee not found" });

        res.status(200).json({ message: "Refugee data updated", refugee: updatedRefugee });
    } catch (error) {
        res.status(500).json({ message: "Error updating refugee data", error });
    }
};

// Delete a refugee entry by ID
exports.deleteRefugee = async (req, res) => {
    try {
        const deletedRefugee = await Refugee.findOneAndDelete({ id: req.params.id });

        if (!deletedRefugee) return res.status(404).json({ message: "Refugee not found" });

        res.status(200).json({ message: "Refugee data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting refugee data", error });
    }
};
