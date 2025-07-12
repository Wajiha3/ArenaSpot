import React, { use, useState, useEffect } from "react";
import { BrowserRouter as Routes, Route, useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";
import HistoryMatch from "../Components/HistoryMatch";
import { useUser } from '../hooks/useUser';
import { useMatches } from '../hooks/useMatches';

function Welcome() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Home");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useUser();
  const {getLast3Matches } = useMatches(); 
  const last3Matches = getLast3Matches();

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
            Winning percentage: <span className="font-normal">{user && user.gamesPlayed > 0 ? user.wins * 100 / user.gamesPlayed : "0"}</span>
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
          {last3Matches.slice(0,3).map((match: any, index: number) => (
            <HistoryMatch
              key={index}
              number={index + 1}
              result={match.winningTeam}
            />
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Welcome;
