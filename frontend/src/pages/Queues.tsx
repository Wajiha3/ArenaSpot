import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

interface Team {
  player1: string;
  player2: string;
}

interface CourtType {
  courtName: string;
  courtLevel: string;
  status: "Match In Progress" | "Available" | "Maintenance";
  currentMatch?: {
    team1: Team;
    team2: Team;
    score?: string;
  };
  queue: Team[];
}

function Queues() {
  const fakecourts: CourtType[] = [
    {
      courtName: "1",
      courtLevel: "Beginner",
      status: "Match In Progress",
      currentMatch: {
        team1: { player1: "André", player2: "João" },
        team2: { player1: "Marcus", player2: "Felipe" },
        score: "21-18",
      },
      queue: [
        { player1: "Carlos", player2: "Lili" },
        { player1: "Laura", player2: "Bill" },
      ],
    },
    {
      courtName: "2",
      courtLevel: "Intermediate",
      status: "Available",
      queue: [
        { player1: "Ana", player2: "Maria" },
        { player1: "Pedro", player2: "Tiago" },
      ],
    },
    {
      courtName: "3",
      courtLevel: "Advanced",
      status: "Match In Progress",
      currentMatch: {
        team1: { player1: "Rui", player2: "Sofia" },
        team2: { player1: "Miguel", player2: "Inês" },
        score: "15-12",
      },
      queue: [],
    },
  ];

  const navigate = useNavigate();
  const [courts, setCourts] = useState<CourtType[]>(fakecourts);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [joinedCourts, setJoinedCourts] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleQueue = (courtName: string) => {
    setJoinedCourts((prev) => ({
      ...prev,
      [courtName]: !prev[courtName],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("your-api-endpoint");
        // const data = await response.json();
        // setCourts(data);
      } catch (err) {
        setErrors({ form: "Network error" });
      }
    };
    fetchData();
  }, []);

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
        {errors.form && (
          <div className="bg-red-900/20 text-red-400 p-2 rounded text-center text-sm mb-4">
            ⚠️ {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court, index) => (
            <div
              key={index}
              className="bg-[#112240] rounded-xl p-6 border border-[#1e3a8a]/30 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#64ffda]">
                    Court {court.courtName}
                  </h2>
                  <p className="text-sm text-[#8892b0]">{court.courtLevel}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    court.status === "Match In Progress"
                      ? "bg-red-900/30 text-red-400"
                      : court.status === "Available"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {court.status}
                </span>
              </div>

              {court.currentMatch && (
                <div className="mb-4 bg-[#1e3a8a]/20 p-3 rounded-lg">
                  <h3 className="text-sm font-semibold text-[#ccd6f6] mb-1">
                    Current Match:
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#64ffda]">
                        {court.currentMatch.team1.player1} &{" "}
                        {court.currentMatch.team1.player2}
                      </p>
                      <p className="text-[#64ffda]">
                        vs {court.currentMatch.team2.player1} &{" "}
                        {court.currentMatch.team2.player2}
                      </p>
                    </div>
                    {court.currentMatch.score && (
                      <span className="text-lg font-bold">
                        {court.courtName === "1" ? "40 mins" : "25 mins"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#ccd6f6] mb-2">
                  Queue ({court.queue.length}{" "}
                  {court.queue.length === 1 ? "team" : "teams"}):
                </h3>
                {court.queue.length > 0 ? (
                  <ul className="space-y-2">
                    {court.queue.map((team, i) => (
                      <li key={i} className="flex items-center text-[#8892b0]">
                        <span className="w-5 text-[#64ffda]">{i + 1}.</span>
                        <span>
                          {team.player1} & {team.player2}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#8892b0]">No teams waiting</p>
                )}
              </div>

              {/* Added status message above the button */}
              {joinedCourts[court.courtName] && (
                <div className="mb-2 text-center text-sm text-green-400">
                  You're in the queue
                </div>
              )}

              <button
                onClick={() => toggleQueue(court.courtName)}
                className={`w-full py-2 rounded-md font-medium transition-all ${
                  joinedCourts[court.courtName]
                    ? "bg-gradient-to-r from-[#ff5555] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff5555]"
                    : "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a]"
                }`}
              >
                {joinedCourts[court.courtName] ? "Leave Queue" : "Join Queue"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
}

export default Queues;
