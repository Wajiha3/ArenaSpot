import React, { use, useState, useEffect } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

interface UserType {
  _id: string;
  userName: string;
  password: string;
  email: string;
  position: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  paymentToken: boolean;
  level: string;
}

function Welcome() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Home");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<UserType| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(sessionStorage.getItem('token'));
        const response = await fetch('http://localhost:3007/api/user/:id', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("User data fetched successfully:", data);
        } else {
          const resData = await response.json();
          console.log(sessionStorage.getItem('token'));
          console.error('Error fetching user data:', resData.message);
        }
      } catch (err) {
        setErrors({ form: "Network error" });
        console.error('Network error:', err);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 60000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-black w-screen text-black pt-[2rem] min-h-screen pb-[6rem]">
      {errors.form && (<div className="text-red-500 text-center">{errors.form}</div>)}
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div className="w-[3.6rem] h-[5.4rem]">
          <img src="/logo.png" alt="" />
        </div>
        <div className="h-[34px] flex gap-2">
          <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%] px-[1.5rem]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">
          Welcome, {user ? user.userName : "Player"}
        </p>
        <div className="flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] font-bold p-[2rem]">
          <p>
            Status: <span className="font-normal">Open</span>
          </p>
          <p>
            Active Courts: <span className="font-normal">6</span>
          </p>
          <p>
            Players Checked In: <span className="font-normal">45</span>
          </p>
          <button
            className="mt-10 bg-[#68C46B] text-[1.5rem] text-white rounded-[25px] font-bold w-[55%] h-[3.5rem]"
            onClick={() => navigate("/checkin")}
          >
            Check In
          </button>
        </div>
        <p className="text-[2rem] font-bold mt-[2rem] self-start text-white">
          Quick Actions
        </p>
        <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4 w-full">
          <button
            className="w-full h-20 bg-[#68C46B] text-[1.25rem] font-bold rounded-xl"
            onClick={() => navigate("/queues")}
          >
            View Queues
          </button>
          <button
            className="w-full h-20 bg-[#FF9800] text-[1.25rem] font-bold rounded-xl"
            onClick={() => navigate("/matches")}
          >
            My Matches
          </button>
          <button
            className="w-full h-20 bg-[#9C27B0] text-[1.25rem] font-bold rounded-xl col-span-2"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>
        </div>
        <p className="text-[2rem] font-bold mt-[2rem] mb-[1rem] self-start text-white">
          Stats & History
        </p>
        <div className="w-full bg-[#83A1ED] rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold">
          <p>
            Games Played: <span className="font-normal">{user ? user.gamesPlayed : ""}</span>
          </p>
          <p>
            Wins: <span className="font-normal">{user ? user.wins : ""}</span>
          </p>
          <p>
            Losses: <span className="font-normal">{user ? user.losses : ""}</span>
          </p>
          <p>
            Winning percentage: <span className="font-normal">{user ? user.wins * 100 / user.gamesPlayed : ""}</span>
          </p>
          <p>
            Level: <span className="font-normal">{user ? user.level : ""}</span>
          </p>
          <div className="w-full bg-[#D9D9D9] rounded-full h-4">
            <div
              className="bg-[#20BF00] h-4 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
        <div className="mt-5 w-full bg-[#74D8BC] rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold mb-[2rem]">
          <div className="flex justify-between">
            <span>Game 1:</span>
            <span>Won</span>
          </div>
          <div className="flex justify-between">
            <span>Game 2:</span>
            <span>Lost</span>
          </div>
          <div className="flex justify-between">
            <span>Game 3:</span>
            <span>Won</span>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Welcome;
