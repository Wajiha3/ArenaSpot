import React, { use, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct
import Court from '../Components/Court';

function Queues() {
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState('Queues');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [inQueue2, setInQueue2] = useState(false);
    const [inQueue3, setInQueue3] = useState(false);

    const array = [{number: 1, level: "Beginner", queue: [{firstname: "Lucas", lastname: "Smith"}, {firstname: "Marcus", lastname: "Johnson"}, {firstname: "Alice", lastname: "Brown"}, {firstname: "Bob", lastname: "Davis"}]},
                   {number: 2, level: "Intermediate", queue: [{firstname: "John", lastname: "Doe"}, {firstname: "Jane", lastname: "Doe"}, {firstname: "Alice", lastname: "Smith"}, {firstname: "Bob", lastname: "Johnson"}]},
                   {number: 3, level: "Advanced", queue: [{firstname: "Charlie ", lastname: "Brown"}]}
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3007/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify(),
                });
                if (response.ok) {
                    const resData = await response.json();
                    localStorage.setItem('token', resData.token);
                    navigate('/welcome');
                } else {
                    const resData = await response.json();
                    // handle error
                }
            } catch (err) {
                setErrors({ form: "Network error" });
            }
        };
        fetchData();
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

                {array.map((court, index) => (
                    <Court key={index} number={court.number} level={court.level} queue={court.queue} />
                ))}
                
            </div>
            <Navbar />
        </div>
    );
}

export default Queues;