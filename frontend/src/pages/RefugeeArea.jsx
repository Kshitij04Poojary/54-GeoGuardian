import { Link } from 'react-router-dom';
import Chatbot from '../components/chats/Chatbot';

const RefugeeArea = () => {
  const areas = [
    { id: 1, name: 'Area 1' },
    { id: 2, name: 'Area 2' },
    { id: 3, name: 'Area 3' },
    // Add more areas as needed
  ];

  return (
    <div className="mx-auto p-5 text-center bg-gray-100 rounded-lg shadow-md w-full h-100 relative">
      <h1 className="text-4xl mb-5 text-gray-800">Refugee Areas</h1>
      <div className="flex flex-col gap-2">
        {areas.map((area) => (
          <Link to={`/refugeearea/${area.id}`} key={area.id}>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300 w-full h-50 text-xl mr-5">
              {area.name}
            </button>
          </Link>
        ))}
      </div>
      <Chatbot />
    </div>
  );
};

export default RefugeeArea;