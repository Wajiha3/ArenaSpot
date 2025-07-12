import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourts } from "../hooks/useCourts";
import Navbar from "../Components/Navbar";
import Court from "../Components/Court";


function Queues() {
  const navigate = useNavigate();
  const { courts, currentMatches } = useCourts();
  const [userQueue, setUserQueue] = useState<string | null>(null);

  return (
    <div className="bg-[#0a192f] min-h-screen text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a192f]/90 py-4 px-6 border-b border-[#1e3a8a]">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/welcome")}
            className="text-white hover:text-[#64ffda] transition-colors"
          >
            ← Back
          </button>
          <div className="text-[#64ffda] font-medium">Court Queues</div>
          <button
            className="p-2 hover:bg-[#1e3a8a]/30 rounded-full transition-colors"
            onClick={() => navigate("/livematch")}
          >
            <img
              width={24}
              src="/Icons/notifications.png"
              alt="Notifications"
              className="filter brightness-0 invert"
            />
          </button>
        </div>
      </div>

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <Court
              _courtId={court._id}
              key={court._id}
              courtName={court.courtName}
              level={court.courtLevel}
              queue={court.queue}
              userQueue={userQueue}
              setUserQueue={setUserQueue}
              currentMatch={currentMatches[court._id]} // Pass current match here
            />
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
}

export default Queues;
