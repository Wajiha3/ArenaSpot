import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourts } from "../hooks/useCourts";
import Navbar from "../Components/Navbar";
import Court from "../Components/Court";
import ReactBellIcon from "../animations/bell";
import { useBell } from "../context/BellContext";
import { useUser } from "../hooks/useUser";

function Queues() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { courts, currentMatches } = useCourts();
  const [userQueue, setUserQueue] = useState<string | null>(null);
  const { bellRing, handleBellClick, bellAnimate, bellColor } = useBell();

  return (
    <div className="bg-[#0a192f] min-h-screen text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0a192f]/90 py-4 px-6 border-b border-[#1e3a8a]">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/welcome")}
            className="text-white hover:text-[#64ffda] transition-colors"
          >
            ← Back
          </button>
          <div className="text-[#64ffda] font-medium">Court Queues</div>
          <div className="flex items-center space-x-4">
            <ReactBellIcon
              width={"24"}
              height={"24"}
              animationSpeed={"0.3"}
              color={bellColor}
              animate={bellAnimate}
              active={bellAnimate}
              onClick={() => handleBellClick()}
            />
            </div>
        </div>
      </div>

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court, index) => (
            <Court
              _courtId={court._id}
              key={index}
              courtName={court.courtName}
              courtStatus={court.status}
              level={court.courtLevel}
              queue={court.queue}
              userQueue={userQueue}
              setUserQueue={setUserQueue}
              currentMatch={currentMatches[court._id]}
              userLevel={user?.level}
            />
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
}

export default Queues;
