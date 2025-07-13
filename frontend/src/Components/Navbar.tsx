import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/welcome" },
  { label: "Queues", path: "/queues" },
  { label: "Matches", path: "/matches" },
  { label: "Profile", path: "/profile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
      <div className="flex justify-around bg-gray-800 rounded-full p-1 shadow-lg w-full max-w-md">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              )}
              <span className="text-sm px-2">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
