import React, { use, useState, useEffect } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HistoryMatch from "../Components/HistoryMatch";
import { useUser } from '../hooks/useUser';
import { useMatches } from '../hooks/useMatches';
import { useCourts } from "../hooks/useCourts";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactBellIcon from "../animations/bell";

function Welcome() {
  const notify = () => toast.info('Your match is starting hurry up!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  const navigate = useNavigate();
  const [bellRing, setbellRing] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Home");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useUser();
  const { getLast3Matches } = useMatches();
  const last3Matches = getLast3Matches();
  const { courts } = useCourts();
  let progress = 0;
  if (user && typeof user.points === "number") {
    if (user.level === "Beginner") progress = (user.points * 100) / 399;
    else if (user.level === "Intermediate") progress = (user.points * 100) / 799;
    else if (user.level === "Advanced") progress = 100;
  }

  const handleBellClick = () => {
    setbellRing(!bellRing);
    if (!bellRing) {
      notify();
    }
  }

  return (
    <div className="w-screen text-black pt-[2rem] min-h-screen pb-[6rem]">
      {errors.form && (<div className="text-red-500 text-center">{errors.form}</div>)}
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div className="w-[3.6rem] h-[5.4rem]">
          <img src="/logo.png" alt="" />
        </div>
        <div onClick={() => handleBellClick()} className="h-[34px] flex gap-2">
          {/* <img onClick={notify} width={"34px"} src="/Icons/notifications.png" alt="" /> */}
          <ReactBellIcon
          width={"34"}
          height={"34"}
          animationSpeed={"0.3"}
          color={`${bellRing ? "#ff0000" : "#68C46B"}`}
          animate={bellRing}
          active={bellRing}
        />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
          />
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
            Active Courts: <span className="font-normal">{courts.length}</span>
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
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-5 w-full bg-[#74D8BC] rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold mb-[2rem]">
          {last3Matches.length === 0 ? (
            <div className="text-black">No matches found.</div>
          ) : (
            last3Matches.map((match, idx) => (
              <HistoryMatch key={match._courtId} match={match} idx={idx} />
            )))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Welcome;
