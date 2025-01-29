const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  currentAffectedAreas: Number,
  activeReliefOperations: Number,
  recoveredAreas: Number,
  availableFunds: Number,
  volunteerAvailability: Number,
  itemsDistribution: {
    food: Number,
    water: Number,
    medicalSupplies: Number,
    shelter: Number,
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
