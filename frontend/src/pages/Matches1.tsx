import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct

function Matches1() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Matches');

  return (
    <div className="bg-black min-h-screen w-screen text-white pt-4">

      {/* Teams Section - moved down */}
      <div className="flex justify-between mb-8 mt-20">
        {/* Team A */}
        <div className="text-center w-[48%] bg-white text-black p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Team A</h3>
          <div className="space-y-3">
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="font-medium">L Marcus</p>
            </div>
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="font-medium">R Marcus</p>
            </div>
          </div>
        </div>
        {/* Spacer between teams */}
        <div className="w-[4%]"></div>
        {/* Team B */}
        <div className="text-center w-[48%] bg-white text-black p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Team B</h3>
          <div className="space-y-3">
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="font-medium">L Marcus</p>
            </div>
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="font-medium">R Marcus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Time - moved after teams */}
      <div className="flex justify-center items-center my-10 mb-20">
        <div className="text-8xl font-bold">08:10</div>
      </div>

      {/* Finish Button - moved down */}
      <div className="flex justify-center mb-24">
        <button className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-md text-xl" onClick={() => navigate('/matches2')}>
          Finish
        </button>
      </div>

    
        {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Matches1;

