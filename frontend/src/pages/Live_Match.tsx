import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useBell } from "../context/BellContext";

function Live_Match() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const{setBellRing} = useBell();

  const handleClick = async () => {
     try {
            const response = await fetch(`http://localhost:3007/api/match/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
            });
            if (response.ok) {
                const data = await response.json();
                setBellRing(false); 
                navigate("/ongoingmatch");
            } else {
                const resData = await response.json();
                console.error("Failed to create match:", resData);
            }
        } catch (err) {
            console.error('Error creating match:', err);
        }
  };

  return (
    <div className="bg-gradient-to-b from-[#0a3d62] to-[#0c2461] min-h-screen w-screen text-white pt-4 pb-20">
      {/* Header with back button only */}
      <div className="px-6 py-4">
        <button
          onClick={() => navigate("/welcome")}
          className="text-white hover:text-[#64ffda] transition-colors text-lg flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mt-6 text-[#f8c291]">Your Match</h1>
        <h2 className="text-3xl font-bold mb-6 text-[#f8c291]">Is Now</h2>
      </div>

      {/* Teams card - Sand Court Design */}
      <div className="relative mx-auto w-[90%] max-w-[400px] h-[320px] bg-[#edcc9b] rounded-xl shadow-lg border-4 border-[#d2b48c] overflow-hidden">
        {/* Net */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white transform -translate-x-1/2 z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
        </div>

        {/* Team names */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="bg-[#ffffff80] px-6 py-2 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#0c2461]">TEAM A</h3>
          </div>
          <div className="bg-[#ffffff80] px-6 py-2 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#0c2461]">TEAM B</h3>
          </div>
        </div>

        {/* Player positions - Adjusted first row down */}
        <div className="absolute top-[35%] left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          L
        </div>
        <div className="absolute top-[35%] left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          R
        </div>
        <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          R
        </div>
        <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          L
        </div>

        {/* Player names - Adjusted to match new positions */}
        <div className="absolute top-[40%] left-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">Marcus</p>
        </div>
        <div className="absolute top-[55%] left-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">Pedro</p>
        </div>
        <div className="absolute top-[40%] right-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">João</p>
        </div>
        <div className="absolute top-[55%] right-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">Andre</p>
        </div>

        {/* Sand texture elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-4 h-4 bg-white rounded-full top-1/4 left-1/4"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full top-1/3 right-1/3"></div>
        </div>
      </div>

      {/* Start button - Beach vibe */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => handleClick()}
          className="px-12 py-4 bg-gradient-to-r from-[#f8c291] to-[#e58e26] text-[#0c2461] text-2xl font-bold rounded-full shadow-lg hover:shadow-xl hover:from-[#f9b76b] hover:to-[#e67e22] transition-all duration-300 transform hover:scale-105"
        >
          START
        </button>
      </div>

      <Navbar />
    </div>
  );
}

export default Live_Match;
