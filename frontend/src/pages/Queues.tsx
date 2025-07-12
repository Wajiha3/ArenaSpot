import React, { use, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct
import Court from '../Components/Court';
import { useCourts } from '../hooks/useCourts';

function Queues() {
    const fakecourts = [
        {
            courtName: "1", courtLevel: "Beginner", queue: [
                { firstName: "Alice" },
                { firstName: "Bob" },
                { firstName: "Charlie" },
                { firstName: "David" }
            ]
        },
        { courtName: "2", courtLevel: "Intermediate", queue: [] },
        {
            courtName: "3", courtLevel: "Advanced", queue: [
                { firstName: "Eve" },
                { firstName: "Frank" }
            ]
        },
        { courtName: "4", courtLevel: "Expert", queue: [] },
        { courtName: "5", courtLevel: "Pro", queue: [] },
        { courtName: "6", courtLevel: "Elite", queue: [] }
    ];

    const navigate = useNavigate();
    const { courts, isLoading } = useCourts(); // Custom hook to fetch courts
    const [userQueue, setUserQueue] = useState<string | null>(null);

    return (
        <div className="w-screen text-black pt-[2rem] min-h-screen">
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
                    <>
                        {courts.map((court, index) => (
                            <Court
                                _courtId={court._id} 
                                key={index}
                                number={court.courtName}
                                level={court.courtLevel}
                                queue={court.queue}
                                userQueue={userQueue}
                                setUserQueue={setUserQueue}                            
                            />
                        ))}
                    </>
            </div>
            <Navbar />
        </div>
    );
}

export default Queues;
