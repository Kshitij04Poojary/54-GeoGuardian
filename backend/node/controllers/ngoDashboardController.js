const NGODashboard = require('../models/ngoDashboardModel');

// Create or update the NGO Dashboard
exports.createOrUpdateDashboard = async (req, res) => {
    try {
        const { 
            currentAffectedAreas, activeReliefOperations, recoveredAreas, 
            availableFunds, resourcesDeployed, resourcesNeeded, volunteers 
        } = req.body;

        let dashboard = await NGODashboard.findOne();
        if (dashboard) {
            dashboard = await NGODashboard.findByIdAndUpdate(dashboard._id, req.body, { new: true, runValidators: true });
        } else {
            dashboard = new NGODashboard(req.body);
            await dashboard.save();
        }

        res.status(200).json({ success: true, message: "NGO Dashboard updated successfully", dashboard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get NGO Dashboard data
exports.getDashboard = async (req, res) => {
    try {
        const dashboard = await NGODashboard.findOne();
        if (!dashboard) return res.status(404).json({ success: false, message: "Dashboard not found" });

        res.status(200).json({ success: true, dashboard });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a volunteer
exports.addVolunteer = async (req, res) => {
    try {
        const { name, age, gender, phoneNumber, additionalInfo } = req.body;
        let dashboard = await NGODashboard.findOne();

        if (!dashboard) {
            return res.status(404).json({ success: false, message: "Dashboard not found" });
        }

        dashboard.volunteers.push({ name, age, gender, phoneNumber, additionalInfo });
        await dashboard.save();

        res.status(201).json({ success: true, message: "Volunteer added successfully", dashboard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Remove a volunteer by ID
exports.removeVolunteer = async (req, res) => {
    try {
        const dashboard = await NGODashboard.findOne();
        if (!dashboard) return res.status(404).json({ success: false, message: "Dashboard not found" });

        dashboard.volunteers = dashboard.volunteers.filter(volunteer => volunteer._id.toString() !== req.params.volunteerId);
        await dashboard.save();

        res.status(200).json({ success: true, message: "Volunteer removed successfully", dashboard });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete the NGO Dashboard
exports.deleteDashboard = async (req, res) => {
    try {
        const dashboard = await NGODashboard.findOneAndDelete();
        if (!dashboard) return res.status(404).json({ success: false, message: "Dashboard not found" });

        res.status(200).json({ success: true, message: "NGO Dashboard deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
