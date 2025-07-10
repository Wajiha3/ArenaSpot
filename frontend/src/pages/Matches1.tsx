import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Matches1() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Matches');

  return (
    <div className="bg-black min-h-screen w-screen text-white pt-4">

   <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
       
       <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg">{"< back"}</button>
        </div>
        
      </div>

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
        <button className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-md text-xl">
          Finish
        </button>
      </div>

    
        {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-3 border-t border-gray-700">
        <button
          className={`text-center ${selectedNav === 'Home' ? 'text-blue-400 font-bold' : ''}`}
          onClick={() => setSelectedNav('Home')}
        >
          <span className="block">Home</span>
        </button>
        <button
          className={`text-center ${selectedNav === 'Queues' ? 'text-blue-400 font-bold' : ''}`}
          onClick={() => setSelectedNav('Queues')}
        >
          <span className="block">Queues</span>
        </button>
        <button
          className={`text-center ${selectedNav === 'Matches' ? 'text-blue-400 font-bold' : ''}`}
          onClick={() => setSelectedNav('Matches')}
        >
          <span className="block">Matches</span>
        </button>
        <button
          className={`text-center ${selectedNav === 'Profile' ? 'text-blue-400 font-bold' : ''}`}
          onClick={() => setSelectedNav('Profile')}
        >
          <span className="block">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Matches1;

