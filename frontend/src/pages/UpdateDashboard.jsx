import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const UpdateDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentAffectedAreas: "",
    activeReliefOperations: "",
    recoveredAreas: "",
    availableFunds: "",
    volunteerAvailability: "",
    itemsDistribution: {
      food: "",
      water: "",
      medicalSupplies: "",
      shelter: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["food", "water", "medicalSupplies", "shelter"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        itemsDistribution: {
          ...prevData.itemsDistribution,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/api/dashboard/update", formData);
      navigate("/dashboard/analytics");
    } catch (error) {
      alert("Error updating dashboard: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Update Dashboard
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Manage and update relief operation statistics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Current Affected Areas
                </label>
                <input
                  type="number"
                  name="currentAffectedAreas"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Active Relief Operations
                </label>
                <input
                  type="number"
                  name="activeReliefOperations"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Recovered Areas
                </label>
                <input
                  type="number"
                  name="recoveredAreas"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Available Funds
                </label>
                <input
                  type="number"
                  name="availableFunds"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Volunteer Availability
                </label>
                <input
                  type="number"
                  name="volunteerAvailability"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
              Items Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Food Supplies
                </label>
                <input
                  type="number"
                  name="food"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Water Supplies
                </label>
                <input
                  type="number"
                  name="water"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Medical Supplies
                </label>
                <input
                  type="number"
                  name="medicalSupplies"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Shelter Supplies
                </label>
                <input
                  type="number"
                  name="shelter"
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Update Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDashboard;