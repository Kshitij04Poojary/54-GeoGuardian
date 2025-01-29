import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RefugeeAreaDetails = () => {
  const { id } = useParams(); // Get the area ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [searchQuery, setSearchQuery] = useState('');
  const [areaDetails, setAreaDetails] = useState([]);

  useEffect(() => {
    // Simulate fetching data for the area
    const fetchAreaDetails = () => {
      const details = [
        { name: 'Refugee 1', image: 'image1.jpg' },
        { name: 'Refugee 2', image: 'image2.jpg' },
        { name: 'Refugee 3', image: 'image3.jpg' },
        // Add more details as needed
      ];
      // Filtering based on search query
      const filteredDetails = details.filter(detail =>
        detail.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAreaDetails(filteredDetails);
    };

    fetchAreaDetails();
  }, [id, searchQuery]); // Re-fetch data when area ID or search query changes

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-start py-10 w-full h-screen">
      <div className="w-full max-w-7xl bg-white p-5 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-5">Details for Area {id}</h1>
        
        {/* "Back to Areas" Button */}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 mb-4"
          onClick={() => navigate('/refugeearea')}
        >
          Back to Areas
        </button>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {areaDetails.map((refugee, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img src={refugee.image} alt={refugee.name} className="w-24 h-24 mx-auto mb-4 object-cover rounded-full" />
              <p className="text-lg text-gray-700">{refugee.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefugeeAreaDetails;
