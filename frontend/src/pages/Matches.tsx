import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

type Match = {
  id: number;
  team1: string;
  team2: string;
  result: "Won" | "Lost";
  score: string;
  duration: string;
  link?: string;
};

type FilterOption =
  | "Today"
  | "Last week"
  | "Last month"
  | "Last year"
  | "All time";

function Matches() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("Today");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterOptions: FilterOption[] = [
    "Today",
    "Last week",
    "Last month",
    "Last year",
    "All time",
  ];

  const matchGroups: Record<FilterOption, Match[]> = {
    Today: [
      {
        id: 1,
        team1: "João & Gonçalo",
        team2: "Jonny & André",
        result: "Won",
        score: "21-18",
        duration: "45 min",
        link: "/match/1",
      },
      {
        id: 2,
        team1: "Lucas & Marcus",
        team2: "André & Felipe",
        result: "Lost",
        score: "18-21",
        duration: "42 min",
      },
    ],
    "Last week": [
      {
        id: 1,
        team1: "Team A",
        team2: "Team B",
        result: "Won",
        score: "21-16",
        duration: "44 min",
        link: "/match/2",
      },
    ],
    "Last month": [
      {
        id: 1,
        team1: "Team C",
        team2: "Team D",
        result: "Lost",
        score: "20-22",
        duration: "42 min",
        link: "/match/3",
      },
    ],
    "Last year": [
      {
        id: 1,
        team1: "Team E",
        team2: "Team F",
        result: "Lost",
        score: "18-21",
        duration: "39 min",
        link: "/match/4",
      },
    ],
    "All time": [
      {
        id: 1,
        team1: "Team G",
        team2: "Team H",
        result: "Won",
        score: "21-19",
        duration: "40 min",
        link: "/match/5",
      },
    ],
  };

  const handleMatchClick = (match: Match) => {
    if (match.link) {
      navigate(match.link);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011937] to-[#003366] text-white pb-24">
      {/* Header */}
      <div className="pt-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Matches</h1>
          <button className="p-2 rounded-full bg-white/10">
            <img
              width={24}
              src="/Icons/filter.png"
              alt="Filter"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </button>
        </div>

        {/* Filter Buttons with Swipe Controls */}
        <div className="mb-8 flex items-center space-x-2">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full bg-white/10 flex-shrink-0 hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Scrollable Filter Buttons */}
          <div
            ref={scrollRef}
            className="flex-1 flex space-x-3 overflow-x-auto scrollbar-hide px-2"
          >
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 rounded-full whitespace-nowrap flex-shrink-0 transition-colors ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-[#FFA500] to-[#FF6347]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full bg-white/10 flex-shrink-0 hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Match Cards */}
      {/* Match Cards */}
      <div className="px-4 space-y-4 mb-20">
        {matchGroups[selectedFilter].map((match) => (
          <div
            key={match.id}
            className={`bg-white/10 rounded-xl p-4 border ${
              match.result === "Won"
                ? "border-green-400/30"
                : "border-red-400/30"
            } shadow-md hover:shadow-lg transition-all ${
              match.link ? "cursor-pointer hover:bg-white/15" : ""
            }`}
            onClick={() => handleMatchClick(match)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-start space-x-2">
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded-full ${
                      match.result === "Won" ? "bg-yellow-400" : "bg-red-500"
                    }`}
                  >
                    <span className="text-xs font-bold text-white">
                      {match.result === "Won" ? "W" : "L"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{match.team1}</span>
                    <span className="text-lg font-semibold">
                      vs {match.team2}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-white/80">
                  <span>Score: {match.score}</span>
                  <span>{match.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-lg font-bold ${
                    match.result === "Won" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {match.result}
                </span>
                {match.link && (
                  <div className="text-white/50 text-right mt-1">&gt;</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <Navbar />
      </div>
    </div>
  );
}

export default Matches;
