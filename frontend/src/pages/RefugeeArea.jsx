import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, Home, Radio } from 'lucide-react';
import axios from 'axios';
import Chatbot from '../components/chats/Chatbot';

const RefugeeArea = () => {
  const [refugeeAreas, setRefugeeAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefugeeAreas();
  }, []);

  const fetchRefugeeAreas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/refugee');
      setRefugeeAreas(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch refugee areas');
      setLoading(false);
      console.error('Error fetching refugee areas:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Radio className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading refugee areas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchRefugeeAreas}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Radio className="h-8 w-8 text-red-500 animate-pulse" />
          Refugee Area Monitoring
        </h1>
        <p className="text-gray-600">Track and manage refugee areas and disaster zones</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Areas</p>
              <h3 className="text-2xl font-bold text-gray-800">{refugeeAreas.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Disasters</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {new Set(refugeeAreas.map(area => area.disaster)).size}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Locations</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {new Set(refugeeAreas.map(area => area.location)).size}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Refugee Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {refugeeAreas.map((area) => (
          <div 
            key={area.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            
              <div className="p-6 block">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{area.areaname}</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    {area.disaster}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{area.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="text-xs px-2 py-1 bg-gray-100 rounded-md">ID: {area.id}</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </p>
              </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {refugeeAreas.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="bg-white p-8 rounded-xl shadow-md inline-block">
            <Radio className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Refugee Areas Found</h3>
            <p className="text-gray-600">No refugee areas have been registered in the system yet.</p>
          </div>
        </div>
      )}
      <Chatbot />
    </div>
  );
};

export default RefugeeArea;
