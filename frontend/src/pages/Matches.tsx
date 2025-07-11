import React, { useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct

function Matches() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Matches");
  const filterOptions = [
    "Today",
    "Last week",
    "Last month",
    "Last year",
  ] as const;
  type FilterType = (typeof filterOptions)[number];
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Today");
  const matchGroups: Record<
    FilterType,
    Array<{ label: string; result: string; link?: string }>
  > = {
    Today: [
      { label: "Match 1:", result: "Won", link: "/match1" },
      { label: "Match 2:", result: "Lost" },
      { label: "Match 3:", result: "Won" },
      { label: "Match 4:", result: "Lost" },
      { label: "Match 5:", result: "Lost" },
      { label: "Match 6:", result: "Lost" },
    ],
    "Last week": [
      { label: "Match 1:", result: "Lost", link: "/match1" },
      { label: "Match 2:", result: "Won" },
      { label: "Match 3:", result: "Won" },
      { label: "Match 4:", result: "Lost" },
    ],
    "Last month": [
      { label: "Match 1:", result: "Lost", link: "/match1" },
      { label: "Match 2:", result: "Won" },
      { label: "Match 3:", result: "Won" },
    ],
    "Last year": [
      { label: "Match 1:", result: "Lost", link: "/match1" },
      { label: "Match 2:", result: "Won" },
      { label: "Match 3:", result: "Lost" },
      { label: "Match 4:", result: "Won" },
      { label: "Match 5:", result: "Lost" },
      { label: "Match 6:", result: "Lost" },
      { label: "Match 7:", result: "Lost" },
    ],
  };

  return (
    <div className="bg-black w-screen text-white pt-[2rem] pb-[5rem]">
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
        <div className="bg-white rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold mb-[2rem] w-[90%] max-w-xl">
          {matchGroups[selectedFilter].map((match, idx) => (
            <div className="flex justify-between" key={idx}>
              {match.link ? (
                <span
                  className="cursor-pointer hover:underline text-black"
                  onClick={() => match.link && navigate(match.link)}
                >
                  {match.label}
                </span>
              ) : (
                <span className="text-black">{match.label}</span>
              )}
              <span
                className={
                  match.result === "Won"
                    ? "text-green-600"
                    : match.result === "Lost"
                    ? "text-red-600"
                    : ""
                }
              >
                {match.result}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Matches;
