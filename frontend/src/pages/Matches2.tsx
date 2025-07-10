import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct

function Matches2() {
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
            <h5 className="text-3xl text-blue-700 font-bold mb-4">WON</h5>
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
            <h5 className="text-3xl text-red-700 font-bold mb-4">LOST</h5>
          </div>
        </div>
      </div>


      {/* Finish Button - moved further down */}
      <div className="flex justify-center mt-20 mb-60">
        <button className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-md text-xl" onClick={() => navigate('/welcome')}>
          SAVE
        </button>
      </div>

    
        {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Matches2;
