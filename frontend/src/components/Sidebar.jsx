import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Map,
  Users,
  LineChart,
  ChartArea,
  Cross,
  Globe,
  Tent,
  ScrollText,
  IndianRupee,
  LogOut
} from 'lucide-react';
import { UserContext } from "../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access user info from UserContext
  const { user } = useContext(UserContext);  // Accessing user context

  // Destructure userType from user.user
  const { userType } = user?.user || {};  // Default to empty if no user data

  const routes = [
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      allowedFor: ["Admin", "NGO"],
      icon: LineChart
    },
    {
      name: "Nearby help",
      path: "/dashboard/map",
      allowedFor: ["Admin", "Citizen", "Organization"],
      icon: Map
    },
    {
      name: "Notices",
      path: "/dashboard/notices",
      allowedFor: ["Admin", "NGO", "Organization", "Citizen"],
      icon: ScrollText
    },
    {
      name: "Forum",
      path: "/dashboard/forum",
      allowedFor: ["Admin", "NGO", "Organization"],
      icon: Users
    },
    {
      name: "Aid",
      path: "/dashboard/aid",
      allowedFor: ["Admin", "Citizen"],
      icon: Cross
    },
    {
      name: "GeoAnalysis",
      path: "/dashboard/geoanalysis",
      allowedFor: ["Admin", "Organization"],
      icon: ChartArea
    },
    {
      name: "Refugee Details",
      path: "/dashboard/refugeearea",
      allowedFor: ["Admin", "NGO", "Organization", "Citizen"],
      icon: Tent
    },
    {
      name: "Donation",
      path: "/donate",
      allowedFor: ["Admin", "NGO", "Organization", "Citizen"],
      icon: IndianRupee
    },
    {
      name: "Logout",
      path: "/",
      allowedFor: ["Admin", "NGO", "Organization", "Citizen"],
      icon: LogOut
    }
  ];

  // Filter routes based on userType
  const filteredRoutes = routes.filter(route =>
    route.allowedFor.includes(userType)
  );

  return (
    <div className="h-screen w-[18%] bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Fancy Title Section */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 animate-pulse" />
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl text-grey-500 tracking-wide">
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
          <h3 className="text-sm font-medium mb-1">Need Help ?</h3>
          <p className="text-xs text-gray-600 mb-3">Contact us for support</p>
          <button className="text-sm bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate("/contact")}>
            Support Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
