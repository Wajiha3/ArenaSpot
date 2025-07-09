import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function match1() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Matches');

  return (
    <div className="bg-black min-h-screen w-screen text-white pt-4">

   <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
       
       <div className='w-[3.6rem] h-[5.4rem]'>
            <button>{"< back"}</button>
        </div>

        <div className="h-[34px] flex gap-2">
            <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
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

export default match1;
