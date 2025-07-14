import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { UserType } from "../hooks/useUser";
import { MatchesType } from "../hooks/useMatches";
import { useBell } from "../context/BellContext";
import { on } from "events";

function Ongoing_Match() {
  const { _courtId } = useParams();
  const navigate = useNavigate();
  const { setBellTarget } = useBell();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const [matchDuration, setMatchDuration] = useState("");
  const [match, setMatch] = useState<MatchesType | null>(null);

  useEffect(() => {
      const fetchMacthData = async () => {
        try {
          const response = await fetch(`http://localhost:3007/api/matches/${_courtId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
          });
          const data = await response.json();
          setMatch(data);
        } catch (err) {
          console.error("Network error:", err);
        }
      };
  
      fetchMacthData(); // Initial fetch
    }, []);


  useEffect(() => {
    if (match && match.started) {
      const interval = setInterval(() => {
        const start = new Date(match.started).getTime();
        const now = Date.now();
        const diff = Math.max(0, now - start); // milliseconds
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setMatchDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }, 1000);

      // Initial set
      const start = new Date(match.started).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setMatchDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);

      return () => clearInterval(interval);
    }
  }, [match]);

  const courtId = _courtId ?? ""; // fallback to empty string if undefined

  const onClickHandler = () => {
    setBellTarget({ type: "save", courtId: courtId });
    navigate(`/savematch/${_courtId}`)
    }
  
  return (
    <div className="bg-[#011937] min-h-screen w-screen text-white pt-8 pb-20">
      {" "}
      {/* Increased pt-4 to pt-8 */}
      {/* Teams card - Sand Court Design - Moved down */}
      <div className="relative mx-auto w-[90%] max-w-[400px] h-[320px] bg-[#edcc9b] rounded-xl shadow-lg border-4 border-[#d2b48c] overflow-hidden mt-10">
        {" "}
        {/* Added mt-10 */}
        {/* Net */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white transform -translate-x-1/2 z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
        </div>
        {/* Team names */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="bg-[#ffffff80] px-6 py-2 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#0c2461]">TEAM A</h3>
          </div>
          <div className="bg-[#ffffff80] px-6 py-2 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#0c2461]">TEAM B</h3>
          </div>
        </div>
        {/* Player positions */}
        <div className="absolute top-[35%] left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          L
        </div>
        <div className="absolute top-[35%] left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          R
        </div>
        <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          R
        </div>
        <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0c2461] rounded-full flex items-center justify-center text-white font-bold">
          L
        </div>
        {/* Player names */}
        <div className="absolute top-[40%] left-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">{match && match.teamA[0] ? match.teamA[0].firstName : ""}</p>
        </div>
        <div className="absolute top-[55%] left-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">{match && match.teamA[1] ? match.teamA[1].firstName : ""}</p>
        </div>
        <div className="absolute top-[40%] right-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">{match && match.teamB[0] ? match.teamB[0].firstName : ""}</p>
        </div>
        <div className="absolute top-[55%] right-4 text-center">
          <p className="text-2xl font-bold text-[#0c2461]">{match && match.teamB[1] ? match.teamB[1].firstName : ""}</p>
        </div>
        {/* Sand texture elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-4 h-4 bg-white rounded-full top-1/4 left-1/4"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full top-1/3 right-1/3"></div>
        </div>
      </div>
      {/* Timer - Moved down further */}
      <div className="flex justify-center mt-16 mb-10">
        {" "}
        {/* Increased mt-12 to mt-16 and mb-8 to mb-10 */}
        <div className="relative">
          <div className="text-7xl font-bold bg-gradient-to-br from-white to-[#f8c291] text-transparent bg-clip-text tracking-tighter px-1 drop-shadow-[0_2px_8px_rgba(248,194,145,0.4)]">
            {matchDuration && `(${matchDuration})`}
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#0c2461]/10 to-[#0a3d62]/20 pointer-events-none"></div>
        </div>
      </div>
      {/* Finish button - Moved down further */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => onClickHandler()}
          className="relative px-16 py-5 bg-gradient-to-br from-[#ff3e3e] via-[#e74c3c] to-[#c0392b] text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
        >
          <span className="relative z-10">FINISH</span>
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff9999] to-[#ff3e3e] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-white/50 rounded-full group-hover:bg-white/80 transition-all duration-300"></div>
        </button>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Ongoing_Match;
