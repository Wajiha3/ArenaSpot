import React, { useState } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct
import { useUser } from "../hooks/useUser";

function Profile() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Profile");
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const { user } = useUser();

  const handleClick = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011937] to-[#003366] text-white pb-24">
      {/* Header with Logo and Notification */}
      <div className="flex justify-between items-center px-8 pt-8">
        <div className="w-14 h-20">
          <img
            src="/logo.png"
            alt="App Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <button
          className="p-2 hover:bg-[#1e3a8a]/30 rounded-full transition-colors"
          onClick={() => navigate("/livematch")}
        >
          <img
            width={24}
            src="/Icons/notifications.png"
            alt="Notifications"
            className="filter brightness-0 invert"
          />
        </button>
      </div>

      {/* Profile Content */}
      <div className="px-6">
        {/* Profile Title */}
        <h1 className="text-3xl font-bold text-center mt-6 mb-8">My Profile</h1>

        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <img
              src="/Icons/profile_picture.png"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/Icons/default_profile.png";
              }}
            />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{user?.userName}</h2>
            <p className="text-white/80">Lisbon, Portugal</p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Personal Details</h3>
            <button className="p-2">
              <img width={28} src="/Icons/settings.png" alt="Settings" />
            </button>
          </div>

          {/* Details Grid */}
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-white/70">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-white/70">Date of birth</span>
              <span className="font-medium">{user?.birthDate ? user.birthDate.split("-").reverse().join("/"): ""}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-white/70">Password</span>
              <span className="font-medium">{user?.password ? "●".repeat(user.password.length) : ""}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Position</span>
              <span className="font-medium">{user?.position}</span>
            </div>
          </div>

          {/* Log Out Button */}
          <button
            className="mt-10 bg-gradient-to-bl from-[#800000] from-3% to-[#cc0000] to-77% hover:from-[#990000] hover:to-[#b30000] transition-all duration-300 text-white font-bold py-3 w-full rounded-xl shadow-lg hover:shadow-red-500/30"
            onClick={() => handleClick()}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <Navbar />
      </div>
    </div>
  );
}

export default Profile;
