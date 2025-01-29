import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Map,
  Users,
  LineChart,
  Globe
} from 'lucide-react';

const Sidebar = ({ userRole = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      allowedFor: ["admin", "ngo"],
      icon: LineChart
    },
    {
      name: "Nearby help",
      path: "/dashboard/map",
      allowedFor: ["admin", "user"],
      icon: Map
    },
    {
      name: "Forum",
      path: "/dashboard/collab",
      allowedFor: ["admin", "ngo"],
      icon: Users
    },
    {
      name: "Aid",
      path: "/dashboard/aid",
      allowedFor: ["admin", "refugee"],
      icon: Users
    }
  ];

  const filteredRoutes = routes.filter(route =>
    route.allowedFor.includes(userRole) && route.name !== ""
  );

  return (
    <div className="h-screen w-[18%] bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Fancy Title Section */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 animate-pulse" />
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl text-grey-500  racking-wide">
              Geo
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
                Guardian
              </span>
            </h2>
            <div className="h-0.5 w-full bg-gradient-to-r from-white/50 to-transparent mt-1" />
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="p-4 text-gray-600">
        <nav className="space-y-1">
          {filteredRoutes.map((route, index) => {
            const isActive = location.pathname === route.path;

            return (
              <button
                key={index}
                onClick={() => navigate(route.path)}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors cursor-pointer
                  ${isActive
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <route.icon className="w-5 h-5" />
                  <span className="text-m">{route.name}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 cursor-pointer">
        <div className="bg-violet-100 rounded-lg p-4 flex flex-col items-center text-center">
          <div className="w-6 h-6 text-violet-500 mb-2">?</div>
          <h3 className="text-sm font-medium mb-1">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-3">Contact us for support</p>
          <button className="text-sm bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            Support Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;