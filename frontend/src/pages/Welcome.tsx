import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="bg-gradient-to-b from-[#011937] to-[#003366] w-screen text-white pt-[2rem] min-h-screen pb-[6rem]">
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
        <button className="p-2">
          <img width={34} src="/Icons/notifications.png" alt="Notifications" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6">
        {/* Welcome Title */}
        <h1 className="text-3xl font-bold mt-6 mb-8">Welcome, {user ? user.userName : "Player"}</h1>

        {/* Status Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">Status:</span>
              <span className="font-medium text-green-400">Open</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Active Courts:</span>
              <span className="font-medium">{courts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Players Checked In:</span>
              <span className="font-medium">45</span>
            </div>
          </div>

          {/* Check In Button */}
          <button
            className="mt-6 w-full bg-gradient-to-r from-[#00ccff] to-[#0066ff] hover:from-[#00bbee] hover:to-[#0055dd] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            onClick={() => navigate("/checkin")}
          >
            Check In
          </button>
        </div>

        {/* Stats & History Section */}
        <h2 className=" text-2xl font-bold mb-4">Stats & History</h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg border border-white/20">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">Games Played:</span>
              <span className="font-medium">{user ? user.gamesPlayed : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Wins:</span>
              <span className="font-medium text-green-400">{user ? user.wins : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Losses:</span>
              <span className="font-medium text-red-400">{user ? user.losses : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Winning percentage:</span>
              <span className="font-medium">{user && user.gamesPlayed > 0 ? user.wins * 100 / user.gamesPlayed : "0"}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Level:</span>
              <span className="font-medium">{user ? user.level : ""}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-gradient-to-tr from-[#00ffcc]/20 from-47% to-[#009999]/20 to-98% rounded-xl p-6 shadow-lg border border-teal-400/30">
          <h3 className="text-xl font-bold mb-4">Recent Games</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {last3Matches.length === 0 ? (
            <div className="text-black">No matches found.</div>
          ) : (
            last3Matches.map((match, idx) => (
              <HistoryMatch key={match._courtId} match={match} idx={idx} />
            )))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <Navbar />
      </div>
    </div>
  );
}

export default Welcome;
