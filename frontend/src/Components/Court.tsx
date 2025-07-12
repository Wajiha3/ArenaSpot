import React from "react";
import { useState } from "react";

interface User {
  firstName: string;
}

interface CourtProps {
  number: string;
  level: string;
  queue: User[];
  userQueue: string | null;
  setUserQueue: React.Dispatch<React.SetStateAction<string | null>>;
}

function Court({ number, level, queue, userQueue, setUserQueue }: CourtProps) {
  const inQueue = userQueue === number;

  const handleQueueClick = () => {
    if (inQueue) {
      setUserQueue(null); // Leave queue
    } else {
      setUserQueue(number); // Join this queue
    }
  };

  return (
    <div>
      <p className="text-[2rem] font-bold text-white mb-4 w-[95%] max-w-xl mx-auto">
        Court {number} (Futvolley)
      </p>
      <div className="flex flex-col items-center rounded-[20px] bg-[#FFF] text-[1.25rem] p-[2rem] mb-10 w-[95%] max-w-xl mx-auto">
        <p className="text-[1.5rem] font-extrabold text-[#68C46B]">{level}</p>
        <div className="flex flex-row flex-nowrap items-center gap-1">
          <span className="font-bold mr-2 whitespace-nowrap">Status:</span>
          <span className="whitespace-nowrap">
            {queue.length > 0 ? "Match in Progress" : "Empty"}
          </span>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-1">
          <span className="font-bold mr-2 whitespace-nowrap">
            Current Match:
          </span>
          <span className="whitespace-nowrap">Team A vs Team B</span>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-1">
          <span className="font-bold mr-1 whitespace-nowrap">
            Queue Length:
          </span>
          <span className="whitespace-nowrap">
            {queue.length >= 4
              ? `${Math.floor(queue.length / 2)} Teams`
              : `${queue.length} Players`}
          </span>
        </div>
        {inQueue === true ? (
          <p className="text-[#68C46B]">You are in this queue</p>
        ) : (
          ""
        )}
        <p className="font-bold mt-5">Queue</p>
        <div className="grid gap-3 mt-2">
          {Array.from({ length: Math.ceil(queue.length / 2) }).map((_, i) => {
            const player1 = queue[i * 2];
            const player2 = queue[i * 2 + 1];
            return (
              <div key={i + 1}>
                {i + 1}. {player1?.firstName}
                {player2 ? ` & ${player2.firstName}` : ""}
              </div>
            );
          })}
        </div>
        <button
          className={`text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] mt-5 transition-colors duration-200 ${
            inQueue ? "bg-[#C34447] text-white" : "bg-[#264879] text-white"
          }`}
          onClick={handleQueueClick}
        >
          {inQueue ? "Leave Queue" : "Join Queue"}
        </button>
      </div>
    </div>
  );
}

export default Court;
