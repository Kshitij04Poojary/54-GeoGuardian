const express = require('express');
const router = express.Router();
const Dashboard = require("../models/ngoDashboardModel");

// Fetch dashboard data
router.get("/", async (req, res) => {
    try {
      const dashboard = await Dashboard.findOne();
      res.json(dashboard);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

// Update dashboard data
router.put("/update", async (req, res) => {
  try {
    const updatedData = req.body;
    let dashboard = await Dashboard.findOne();
    
    if (!dashboard) {
      dashboard = new Dashboard(updatedData);
    } else {
      Object.assign(dashboard, updatedData);
    }

    await dashboard.save();
    res.json({ message: "Dashboard updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating dashboard" });
  }
});

module.exports = router;

