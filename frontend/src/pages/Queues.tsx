import React, { use, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct
import Court from '../Components/Court';

interface CourtType {
  courtName: string;
  courtLevel: string;
  queue: any[]; // or a more specific type for players
}

function Queues() {
    const navigate = useNavigate();
    const [courts, setCourts] = useState<CourtType[]>([]); // <-- use state for courts
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [userQueue, setUserQueue] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3007/api/allcourts', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourts(data);
                } else {
                    const resData = await response.json();
                    if (resData.error === "Unauthorized") {
                        setErrors({ form: "Unauthorized" });
                    }
                }
            } catch (err) {
                setErrors({ form: "Network error" });
            }
        };

        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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

                {courts.map((court, index) => (
                  <Court
                    key={index}
                    number={court.courtName}
                    level={court.courtLevel}
                    queue={court.queue}
                    userQueue={userQueue}
                    setUserQueue={setUserQueue}
                  />
                ))}
                
            </div>
            <Navbar />
        </div>
  );
}

export default Queues;
