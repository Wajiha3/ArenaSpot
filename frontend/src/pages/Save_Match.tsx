import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { MatchesType } from "../hooks/useMatches";
import { useBell } from "../context/BellContext";

function Save_Match() {
  const { _courtId } = useParams();
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const [teamAScore, setTeamAScore] = useState(2);
  const [teamBScore, setTeamBScore] = useState(0);
  const [match, setMatch] = useState<MatchesType | null>(null);
  const { setBellTarget } = useBell();
  
  useEffect(() => {
    const fetchMacthData = async () => {
      try {
        const response = await fetch(`http://localhost:3033/api/matches/${_courtId}`, {
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

  const incrementScore = (team: "A" | "B") => {
    if (team === "A" && teamAScore < 2) {
      setTeamAScore((prev) => prev + 1);
    } else if(team === "B" && teamBScore < 2) {
      setTeamBScore((prev) => prev + 1);
    }
  };

  const decrementScore = (team: "A" | "B") => {
    if (team === "A" && teamAScore > 0) {
      setTeamAScore((prev) => prev - 1);
    } else if (team === "B" && teamBScore > 0) {
      setTeamBScore((prev) => prev - 1);
    }
  };

  const clickSaveHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3033/api/match/${match?._id}/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' },
        body: JSON.stringify({
          winningTeam: teamAScore > teamBScore ? "teamA" : "teamB",
          score: { teamA: teamAScore, teamB: teamBScore}
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setBellTarget(null);
        navigate("/welcome");
      } 
    } catch (err) {
      console.error('Error saving match:', err);
    }
  };

  return (
    <div className="bg-[#011937] min-h-screen w-screen text-white pt-12 pb-20">
      {/* Sand Court Box */}
      <div className="relative mx-auto w-[90%] max-w-[400px] h-[320px] bg-[#edcc9b] rounded-xl shadow-lg border-4 border-[#d2b48c] overflow-hidden mt-6">
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

      {/* Results Box */}
      <div className="mx-auto w-[90%] max-w-[400px] mt-10 bg-white rounded-xl shadow-lg border-2 border-[#0c2461] overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-[#0c2461]">WINNER</h3>
          </div>

          {/* Score Controls - Centered with larger scores */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <button
                onClick={() => decrementScore("A")}
                className="w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="text-5xl font-bold text-[#0c2461] mx-3 min-w-[50px] text-center">
                {" "}
                {/* Increased to text-5xl */}
                {teamAScore}
              </span>
              <button
                onClick={() => incrementScore("A")}
                className="w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center"
              >
                +
              </button>
              <span className="text-5xl font-bold text-[#0c2461] mx-3">-</span>{" "}
              {/* Increased to match */}
              <button
                onClick={() => decrementScore("B")}
                className="w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="text-5xl font-bold text-[#0c2461] mx-3 min-w-[50px] text-center">
                {" "}
                {/* Increased to text-5xl */}
                {teamBScore}
              </span>
              <button
                onClick={() => incrementScore("B")}
                className="w-8 h-8 bg-[#0c2461] text-white rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Teams - Below scores but above player names */}
          <div className="flex justify-center mb-4 space-x-8">
            <div>
              <p className="text-xl font-bold text-[#0c2461] px-3 py-1 rounded-lg">
                TEAM A
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#0c2461] px-3 py-1 rounded-lg">
                TEAM B
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => clickSaveHandler()}
          className="relative px-16 py-5 bg-gradient-to-br from-[#48c774] via-[#2ecc71] to-[#27ae60] text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
        >
          <span className="relative z-10">SAVE</span>
          <div className="absolute inset-0 bg-gradient-to-br from-[#a8ff78] to-[#78ffd6] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-white/50 rounded-full group-hover:bg-white/80 transition-all duration-300"></div>
        </button>
      </div>

      <Navbar />
    </div>
  );
}

export default Save_Match;
