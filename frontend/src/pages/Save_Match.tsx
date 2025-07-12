import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Save_Match() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");

  return (
    <div className="bg-[#011937] min-h-screen w-screen text-white pt-12 pb-20">
      {" "}
      {/* Increased top padding */}
      {/* Original Sand Court Box - Now Visible Again */}
      <div className="relative mx-auto w-[90%] max-w-[400px] h-[320px] bg-[#edcc9b] rounded-xl shadow-lg border-4 border-[#d2b48c] overflow-hidden mt-6">
        {" "}
        {/* Added margin-top */}
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
        {/* Player positions */}
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
        {/* Player names */}
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
      {/* New Results Box - Positioned Below */}
      <div className="mx-auto w-[90%] max-w-[400px] mt-10 bg-white rounded-xl shadow-lg border-2 border-[#0c2461] overflow-hidden">
        {" "}
        {/* Increased margin-top */}
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-[#0c2461]">WINNER</h3>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div className="text-center w-1/3">
              <p className="text-xl font-bold text-[#0c2461] bg-[#f8c291] px-3 py-1 rounded-lg">
                TEAM A
              </p>
            </div>
            <div className="text-center w-1/3">
              <p className="text-4xl font-bold text-[#0c2461]">2 - 0</p>
            </div>
            <div className="text-center w-1/3">
              <p className="text-xl font-bold text-[#0c2461]">TEAM B</p>
            </div>
          </div>

          <div className="text-center text-lg text-[#0c2461] mb-2">
            <span className="font-bold">L</span>{" "}
            <span className="font-bold">R</span>
          </div>

          <div className="flex justify-center mb-2">
            <div className="text-center w-1/2">
              <p className="text-xl font-bold text-[#0c2461] bg-[#f8c291] px-3 py-1 rounded-lg">
                Marcus
              </p>
            </div>
            <div className="text-center w-1/2">
              <p className="text-xl font-bold text-[#0c2461]">João</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center w-1/2">
              <p className="text-xl font-bold text-[#0c2461] bg-[#f8c291] px-3 py-1 rounded-lg">
                Pedro
              </p>
            </div>
            <div className="text-center w-1/2">
              <p className="text-xl font-bold text-[#0c2461]">Andre</p>
            </div>
          </div>
        </div>
      </div>
      {/* Score Input Boxes */}
      <div className="flex justify-center gap-5 mt-10 mb-8">
        {" "}
        {/* Increased margin-top */}
        <div className="bg-[#f8c291] px-6 py-3 rounded-lg w-[43%] border-2 border-[#0c2461] shadow-md">
          <input
            className="w-full bg-transparent border-none text-center text-xl font-bold text-[#0c2461] placeholder-[#0c246180] focus:outline-none"
            type="number"
            value="2"
            readOnly
          />
        </div>
        <div className="bg-white px-6 py-3 rounded-lg w-[43%] border-2 border-[#011937] shadow-md">
          <input
            className="w-full bg-white border-none text-center text-xl font-medium text-[#011937] placeholder-gray-400 focus:outline-none"
            type="number"
            value="0"
            readOnly
          />
        </div>
      </div>
      {/* Save Button - Moved down further */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/queues")}
          className="relative px-16 py-5 bg-gradient-to-br from-[#48c774] via-[#2ecc71] to-[#27ae60] text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
        >
          <span className="relative z-10">SAVE</span>
          <div className="absolute inset-0 bg-gradient-to-br from-[#a8ff78] to-[#78ffd6] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-white/50 rounded-full group-hover:bg-white/80 transition-all duration-300"></div>
        </button>
      </div>
      <Navbar />
    </div>
  );
}

export default Save_Match;
