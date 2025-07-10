import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct

function Queues() {
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState('Queues');
    const [inQueue1, setInQueue1] = useState(false);
    const [inQueue2, setInQueue2] = useState(false);
    const [inQueue3, setInQueue3] = useState(false);

    return (
        <div className="bg-black w-screen text-black pt-[2rem] min-h-screen">
            <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
                  <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg" onClick={() => navigate('/welcome')}>{"< back"}</button>
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
                    <button
                        className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${inQueue1 ? 'bg-[#C34447] text-white' : 'bg-[#264879] text-white'}`}
                        onClick={() => setInQueue1(!inQueue1)}
                    >
                        {inQueue1 ? 'Leave Queue' : 'Join Queue'}
                    </button>
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
                    <button
                        className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${inQueue2 ? 'bg-[#264879] text-white' : 'bg-[#C34447] text-white'}`}
                        onClick={() => setInQueue2(!inQueue2)}
                    >
                        {inQueue2 ? 'Leave Queue' : 'Join Queue'}
                    </button>
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
                    <button
                        className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${inQueue3 ? 'bg-[#C34447] text-white' : 'bg-[#264879] text-white'}`}
                        onClick={() => setInQueue3(!inQueue3)}
                    >
                        {inQueue3 ? 'Leave Queue' : 'Join Queue'}
                    </button>
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Queues;