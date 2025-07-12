import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Welcome() {
  const navigate = useNavigate();
  const [selectedNav] = useState("Home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011937] to-[#003366] text-white pb-24">
      {/* Header with Logo and Notification */}
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="w-14 h-20">
          <img
            src="/logo.png"
            alt="App Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <button className="p-2">
          <img width={34} src="/Icons/notifications.png" alt="Notifications" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6">
        {/* Welcome Title */}
        <h1 className="text-3xl font-bold mt-6 mb-8">Welcome, Player</h1>

        {/* Status Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">Status:</span>
              <span className="font-medium text-green-400">Open</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Active Courts:</span>
              <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Players Checked In:</span>
              <span className="font-medium">45</span>
            </div>
          </div>

          {/* Check In Button */}
          <button
            className="mt-6 w-full bg-gradient-to-r from-[#00ccff] to-[#0066ff] hover:from-[#00bbee] hover:to-[#0055dd] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            onClick={() => navigate("/checkin")}
          >
            Check In
          </button>
        </div>

        {/* Stats & History Section */}
        <h2 className="text-2xl font-bold mb-4">Stats & History</h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg border border-white/20">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">Games Played:</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Wins:</span>
              <span className="font-medium text-green-400">98</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Losses:</span>
              <span className="font-medium text-red-400">44</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Winning percentage:</span>
              <span className="font-medium">60%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Level:</span>
              <span className="font-medium">Beginner</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-gradient-to-tr from-[#00ffcc]/20 from-47% to-[#009999]/20 to-98% rounded-xl p-6 shadow-lg border border-teal-400/30">
          <h3 className="text-xl font-bold mb-4">Recent Games</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Game 1</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Won
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Game 2</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                Lost
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Game 3</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Won
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <Navbar />
      </div>
    </div>
  );
}

export default Welcome;
