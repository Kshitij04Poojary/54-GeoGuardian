import { useState } from 'react';
import { ChevronRight, Home, Map, Bell, FileText, Settings } from 'lucide-react';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Map size={20} />, label: 'Map', path: '/map' },
    { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts' },
    { icon: <FileText size={20} />, label: 'Guide', path: '/guide' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out 
        ${isHovered ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expand/Collapse Arrow */}
      <div className={`absolute -right-3 top-8 transition-transform duration-300 
        ${isHovered ? 'rotate-180' : ''}`}>
        <div className="bg-gray-800 rounded-full p-1">
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Logo/Brand */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className={`font-bold transition-opacity duration-300 
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          GeoGuardian
        </span>
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className={`flex items-center px-4 py-3 hover:bg-gray-700 transition-all duration-200
              ${isHovered ? 'justify-start gap-4' : 'justify-center'}`}
          >
            {item.icon}
            <span className={`whitespace-nowrap transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0 w-0'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;