import React, { useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct
import { useMatches } from '../hooks/useMatches';
import HistoryMatch from "../Components/HistoryMatch"; // Ensure this path is correct

function Matches() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const { getMatchesToday, getMatchesLastWeek, getMatchesLastMonth, getMatchesLastYear } = useMatches();
  const matches = {
    "Today": getMatchesToday(),
    "Last week": getMatchesLastWeek(),
    "Last month": getMatchesLastMonth(),
    "Last year": getMatchesLastYear(),
  };

  const filterOptions = [
    "Today",
    "Last week",
    "Last month",
    "Last year",
  ] as const;
  type FilterType = (typeof filterOptions)[number];
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Today");

  return (
    <div className="w-screen text-white pt-[2rem] pb-[5rem]">
      <div className="mt-10 flex items-center justify-between w-full px-8">
        <p className="text-[2rem] font-bold text-center mb-2 flex-1 ml-8">
          My Matches
        </p>
        <img width={"34px"} src="/Icons/filter.png" alt="" className="mb-2" />
      </div>

      <div className="mt-10 flex justify-center w-full">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[80%]">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`w-[10rem] h-12 px-8 ${
                selectedFilter === filter ? "bg-[#264879]" : "bg-[#68C46B]"
              } text-[1.25rem] font-bold rounded-[20px] whitespace-nowrap`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center">
        <div className="bg-white rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold mb-[2rem] w-[90%] max-w-xl max-h-[350px] overflow-y-auto">
          {matches[selectedFilter].length === 0 ? (
            <div className="text-black">No matches found.</div>
          ) : (
            matches[selectedFilter].map((match, idx) => (
              <HistoryMatch key={match._courtId} match={match} idx={idx} />
            ))
          )}
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Matches;
