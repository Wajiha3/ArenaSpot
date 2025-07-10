import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Match1() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Matches');

  return (
    <div className="bg-black min-h-screen w-screen text-white pt-4">

   <div className="ml-[2rem] mr-[2rem] flex justify-between items-center h-[34px]">
       <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg">{"< back"}</button>
        </div>
        <div className="h-[34px] flex gap-2 items-center">
            <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>

      {/* Match title */}
      <h1 className="mb-16 text-[2rem] font-bold mt-[2rem] text-center text-white">Match 1</h1>

      {/* Teams section */}
      <div className="flex justify-between mb-6 gap-2">
        {/* Team 1 */}
        <div className="text-center w-[48%] bg-white rounded-lg">
          <div className="p-4 rounded-lg mt-3 mb-3 flex flex-col items-center">
            <p className="text-2xl font-bold text-black">Joao</p>
            <p className="text-2xl font-bold text-black">Goncalo</p>
          </div>
        </div>
        {/* Team 2 */}
        <div className="text-center w-[48%] bg-white rounded-lg">
          <div className="p-4 rounded-lg mb-3 flex flex-col items-center">
            <div className="flex items-center gap-2 mt-4">
              <div className="flex flex-col items-start">
                <p className="text-2xl font-bold text-black">Jonny</p>
                <p className="text-2xl font-bold text-black">Fellipe</p>
              </div>
              <img src="/Icons/trophy.png" alt="Trophy" width="48" height="38" className="ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Result Box */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-0">
        <div className="mb-6">
          <h3 className="font-bold text-2xl mb-4 text-center text-black">Result</h3>
          {/* Grey inner box */}
          <div className="bg-gray-300 p-5 rounded-lg">
            <div className="space-y-3 text-center">
              <div>
                <p className="font-bold text-xl text-black">Final Score</p>
                <p className="text-lg font-medium text-black">2-1(15-12)</p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="font-bold text-xl text-black">Match Duration</p>
                <p className="text-lg font-medium text-black">2 hrs 15 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Black spacer before nav */}
      <div className="w-full bg-black" style={{height: '96px'}}></div>
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
}

export default Match1;
