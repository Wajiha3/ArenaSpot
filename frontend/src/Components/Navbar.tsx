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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-3 border-t border-gray-700 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            className={`text-center ${
              isActive ? "text-blue-400 font-bold" : "text-white"
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="block">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;
