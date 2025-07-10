import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Queues() {
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState('Queues');

    return (
        <div className="bg-black w-screen text-black pt-[2rem] min-h-screen">
            <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
                <div className='w-[3.6rem] h-[5.4rem]'>
                    <img src="/logo.png" alt="" />
                </div>
                <div className="h-[34px] flex gap-2">
                    <img width={"34px"} src="/Icons/notifications.png" alt="" />
                </div>
            </div>
            <div className="flex flex-col items-center w-[100%] px-[1rem]">
                <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">Court Queues</p>
                <p className="text-[2rem] font-bold text-white mb-4">Court 1 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10'>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Status:</span>
                        <span className='whitespace-nowrap'>Match in Progress</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Current Match:</span>
                        <span className='whitespace-nowrap'>Team A vs Team B</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Queue Length:</span>
                        <span className='whitespace-nowrap'>3 Teams</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#264879] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Join Queue</button>
                </div>

                <p className="text-[2rem] font-bold text-white mb-4">Court 2 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10'>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Status:</span>
                        <span className='whitespace-nowrap'>Match in Progress</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Current Match:</span>
                        <span className='whitespace-nowrap'>Team A vs Team B</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Queue Length:</span>
                        <span className='whitespace-nowrap'>3 Teams</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-2 text-[#68C46B] mt-3 mb-3 font-bold'>
                        <span className='whitespace-nowrap'>You are in this queue</span>
                        <span className='whitespace-nowrap'>(Position: 1)</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#C34447] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Leave Queue</button>
                </div>

                <p className="text-[2rem] font-bold text-white mb-4">Court 3 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-20'>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Status:</span>
                        <span className='whitespace-nowrap'>Match in Progress</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Current Match:</span>
                        <span className='whitespace-nowrap'>Team A vs Team B</span>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-1'>
                        <span className='font-bold mr-2 whitespace-nowrap'>Queue Length:</span>
                        <span className='whitespace-nowrap'>3 Teams</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#264879] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Join Queue</button>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-3 border-t border-gray-700 z-50">
                <button
                  className={`text-center ${selectedNav === 'Home' ? 'text-blue-400 font-bold' : ''}`}
                  onClick={() => { setSelectedNav('Home'); navigate('/'); }}
                >
                  <span className="block text-white">Home</span>
                </button>
                <button
                  className={`text-center ${selectedNav === 'Queues' ? 'text-blue-400 font-bold' : ''}`}
                  onClick={() => setSelectedNav('Queues')}
                >
                  <span className="block text-white">Queues</span>
                </button>
                <button
                  className={`text-center ${selectedNav === 'Matches' ? 'text-blue-400 font-bold' : ''}`}
                  onClick={() => { setSelectedNav('Matches'); navigate('/matches'); }}
                >
                  <span className="block text-white">Matches</span>
                </button>
                <button
                  className={`text-center ${selectedNav === 'Profile' ? 'text-blue-400 font-bold' : ''}`}
                  onClick={() => { setSelectedNav('Profile'); navigate('/profile'); }}
                >
                  <span className="block text-white">Profile</span>
                </button>
            </div>
        </div>
    );
}

export default Queues;