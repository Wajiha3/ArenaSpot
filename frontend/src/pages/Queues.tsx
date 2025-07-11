<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct

function Queues() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Queues");
  const [inQueue1, setInQueue1] = useState(false);
  const [inQueue2, setInQueue2] = useState(false);
  const [inQueue3, setInQueue3] = useState(false);

  return (
    <div className="bg-black w-screen text-black pt-[2rem] min-h-screen">
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div></div>
        <div className="h-[34px] flex gap-2">
          <img
            width={"34px"}
            src="/Icons/notifications.png"
            alt="Notifications"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/livematch")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/livematch");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%] px-[1rem]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">
          Court Queues
        </p>
        <p className="text-[2rem] font-bold text-white mb-4">
          Court 1 (Futvolley)
        </p>
        <div className="flex flex-col items-center rounded-[20px] bg-[#2d2d2d] w-[100%] text-[1.25rem] p-[2rem] mb-10">
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap text-green-600">
              BEGINNER
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold text-white mr-2 whitespace-nowrap">
              Status:
            </span>
            <span className="whitespace-nowrap text-white">
              Match in Progress
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap text-white">
              Current Match:
            </span>
            <span className="whitespace-nowrap text-white">
              Team A vs Team B
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap text-white">
              Queue Length:
            </span>
            <span className="whitespace-nowrap text-white">3 Teams</span>
          </div>
          <p className="font-bold mt-5 text-white">Queue</p>
          <ol className="text-[1.25rem] list-decimal mt-3 text-white">
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
          </ol>
          <button
            className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${
              inQueue1 ? "bg-[#C34447] text-white" : "bg-[#264879] text-white"
            }`}
            onClick={() => setInQueue1(!inQueue1)}
          >
            {inQueue1 ? "Leave Queue" : "Join Queue"}
          </button>
=======
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3007/api/allcourts', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
                });
                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Debugging: log the fetched data
                    setCourts(data); // <-- set state with fetched data
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

                {courts.map((court, index) => (
                    <Court key={index} number={court.courtName} level={court.courtLevel} queue={court.queue} />
                ))}
                
            </div>
            <Navbar />
>>>>>>> 8a4a3328079c0aa023e5fa290fda08e958385f4e
        </div>

        <p className="text-[2rem] font-bold text-white mb-4">
          Court 2 (Futvolley)
        </p>
        <div className="flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10">
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap text-green-600">
              INTERMIDIATE
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">Status:</span>
            <span className="whitespace-nowrap">Match in Progress</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">
              Current Match:
            </span>
            <span className="whitespace-nowrap">Team A vs Team B</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">
              Queue Length:
            </span>
            <span className="whitespace-nowrap">3 Teams</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-2 text-[#68C46B] mt-3 mb-3 font-bold">
            <span className="whitespace-nowrap">You are in this queue</span>
            <span className="whitespace-nowrap">(Position: 1)</span>
          </div>
          <p className="font-bold mt-5">Queue</p>
          <ol className="text-[1.25rem] list-decimal mt-3">
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
          </ol>
          <button
            className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${
              inQueue2 ? "bg-[#264879] text-white" : "bg-[#C34447] text-white"
            }`}
            onClick={() => setInQueue2(!inQueue2)}
          >
            {inQueue2 ? "Join Queue" : "Leave Queue"}
          </button>
        </div>

        <p className="text-[2rem] font-bold text-white mb-4">
          Court 3 (Futvolley)
        </p>
        <div className="flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-20">
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap text-green-600">
              ADVANCE
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">Status:</span>
            <span className="whitespace-nowrap">Match in Progress</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">
              Current Match:
            </span>
            <span className="whitespace-nowrap">Team A vs Team B</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-1">
            <span className="font-bold mr-2 whitespace-nowrap">
              Queue Length:
            </span>
            <span className="whitespace-nowrap">3 Teams</span>
          </div>
          <p className="font-bold mt-5">Queue</p>
          <ol className="text-[1.25rem] list-decimal mt-3">
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
            <li className="">Lucas & Marcus</li>
          </ol>
          <button
            className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${
              inQueue3 ? "bg-[#C34447] text-white" : "bg-[#264879] text-white"
            }`}
            onClick={() => setInQueue3(!inQueue3)}
          >
            {inQueue3 ? "Leave Queue" : "Join Queue"}
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Queues;
