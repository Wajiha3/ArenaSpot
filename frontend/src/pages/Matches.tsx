import React, { useState, useRef } from "react";
import { useNavigate, Route } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct
import { useMatches } from '../hooks/useMatches';
import HistoryMatch from "../Components/HistoryMatch"; // Ensure this path is correct

function Matches() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const { getMatchesToday, getMatchesLastWeek, getMatchesLastMonth, getMatchesLastYear, getAllMatches } = useMatches();
const filterOptions = [
    "Today",
    "Last week",
    "Last month",
    "Last year",
    "All Time",
  ] as const;
  type FilterType = (typeof filterOptions)[number];
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Today");


  const matches = {
    "Today": getMatchesToday(),
    "Last week": getMatchesLastWeek(),
    "Last month": getMatchesLastMonth(),
    "Last year": getMatchesLastYear(),
    "All Time": getAllMatches(),
  };
  const scrollRef = useRef<HTMLDivElement>(null);

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

      {/* Matches List */}
      <div className="px-6">
        {matches[selectedFilter].map((match, idx) => (
          <HistoryMatch key={match._courtId} match={match} idx={idx} />
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
