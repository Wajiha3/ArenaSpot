import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct

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

interface MatchesType {
  _courtId: string;
  teamA: UserType[];
  teamB: UserType[];
  status: string;
  winningTeam: string;
  started: Date | string;
  finished: Date | string;
}

function Match1() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [match, setMatch] = useState<MatchesType | null>(null);
  const [selectedNav, setSelectedNav] = useState("Matches");

  useEffect(() => {
    const fetchMatch = async () => {
      const res = await fetch(`http://localhost:3033/api/matches/${id}`, {
        headers: { authorization: sessionStorage.getItem("token") || "" },
      });
      if (res.ok) {
        setMatch(await res.json());
      }
    };
    fetchMatch();
  }, []);

  if (!match) return <div>Loading...</div>;

  return (
    <div className="bg-[#011937] min-h-screen w-screen text-white pt-4">
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center h-[34px]">
        <div className="flex items-center h-[34px]">
          <button
            className="text-white text-lg"
            onClick={() => navigate("/matches")}
          >
            {"< back"}
          </button>
        </div>
      </div>

      {/* Match title */}
      <h1 className="mb-16 text-[2rem] font-bold mt-[2rem] text-center text-white">
        Match
      </h1>

      {/* Teams section */}
      <div className="flex justify-between mb-6 gap-2">
        {/* Team 1 */}
        <div className="text-center w-[48%] bg-white rounded-lg">
          <div className="p-4 rounded-lg mt-3 mb-3 flex flex-col items-center">
            {match.teamA.map((player, index) => (
              <p key={index} className="text-2xl font-bold text-black">
                {player.userName}
              </p>
            ))}
          </div>
          <img
            src={match.winningTeam === "teamA" ? "/Icons/trophy.png" : ""}
            alt="Trophy"
            width="48"
            height="38"
            className="ml-2"
          />
        </div>
        {/* Team 2 */}
        <div className="text-center w-[48%] bg-white rounded-lg">
          <div className="p-4 rounded-lg mb-3 flex flex-col items-center">
            <div className="flex items-center gap-2 mt-4">
              <div className="flex flex-col items-start">
                {match.teamB.map((player, index) => (
                  <p key={index} className="text-2xl font-bold text-black">
                    {player.userName}
                  </p>
                ))}
              </div>
              <img
                src={match.winningTeam === "teamB" ? "/Icons/trophy.png" : ""}
                alt="Trophy"
                width="48"
                height="38"
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result Box */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-0">
        <div className="mb-6">
          <h3 className="font-bold text-2xl mb-4 text-center text-black">
            Result
          </h3>
          {/* Grey inner box */}
          <div className="bg-[#B9E7FF] p-5 rounded-lg">
            <div className="space-y-3 text-center">
              <div>
                <p className="font-bold text-xl text-black">Final Score</p>
                <p className="text-lg font-medium text-black">2-1(15-12)</p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="font-bold text-xl text-black">Match Duration</p>
                <p className="text-lg font-medium text-black">2 hrs 15 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Black spacer before nav */}
      <div className="w-full bg-black" style={{ height: "96px" }}></div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Match1;
