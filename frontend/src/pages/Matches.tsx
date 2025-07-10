import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct

function Matches() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Matches');

  return (
    <div className="bg-black min-h-screen w-screen text-white pt-4">

   <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
       
       <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg" onClick={() => navigate('/welcome')}>{"< back"}</button>
        </div>

        <div className="h-[34px] flex gap-2">
            <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[2rem] font-bold mt-[2rem] text-white">Your Match</h1>
        <h2 className="text-[2rem] font-bold mb-[2rem] text-white">Is Now</h2>
      </div>

      {/* Start Button */}
      <div className="flex justify-center mb-16">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-md text-xl" onClick={() => navigate('/matches1')}>
          Start
        </button>
      </div>

     {/* Teams Section */}
        <div className="flex justify-between">
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
        {/* Bottom Navigation */}
     <Navbar />
    </div>
  );
};

export default Matches;

