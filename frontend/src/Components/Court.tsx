import React, { useEffect, useState } from 'react';
import { useCourts } from '../hooks/useCourts';
import { MatchesType, UserType } from '../hooks/useMatches';
import { useBell } from "../context/BellContext";

interface User {
  _id: string;
  firstName: string;
}

interface CourtProps {
  _courtId: string;
  courtName: string;
  courtStatus: boolean;
  level: string;
  queue: User[];
  userQueue: string | null;
  setUserQueue: React.Dispatch<React.SetStateAction<string | null>>;
  currentMatch: MatchesType | null; // Add this line
  userLevel: string | undefined; // Add user level prop
}

function groupIntoTeams(users: User[]) {
  const teams = [];
  for (let i = 0; i < users.length; i += 2) {
    teams.push([users[i], users[i + 1]]);
  }
  return teams;
}

function Court({ _courtId, courtName, courtStatus, level, queue, userQueue, setUserQueue, currentMatch, userLevel }: CourtProps) {
  const inQueue = userQueue === courtName;
  const isAboveLevel = userLevel !== level
  const { joinCourt, leaveCourt } = useCourts();
  const { bellRing, setBellRing, setNotified, notified, notify, setfourPlayers} = useBell();
  

  useEffect(() => {
    if (!inQueue) return; // Only poll if user is in queue

    const interval = setInterval(async () => {
      const response = await fetch(`http://localhost:3007/api/match/ready/${_courtId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
      });
      const data = await response.json();
      setfourPlayers(data.firstFour); // Assuming data.fourPlayers is an array of UserType
      
      if (data.matchReady && !notified) {
        notify();
        setBellRing(true);
        setNotified(true); // Only notify once
      }
      // Optionally, reset notified if matchReady becomes false
      if (!data.matchReady && notified) {
        setNotified(false);
      }
    }, 1000);


    return () => clearInterval(interval);
  }, [inQueue, _courtId, notified, notify, setBellRing]);

  const handleQueueClick = () => {
    if (inQueue) {
      leaveCourt(_courtId); // Call the leaveCourt function from useCourts
      setUserQueue(null); // Leave queue
    } else {
      joinCourt(_courtId); // Call the joinCourt function from useCourts
      setUserQueue(courtName); // Join this queue
    }
  };

  let matchDuration = "";
  if (currentMatch && currentMatch.started) {
    const start = new Date(currentMatch.started).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - start); // milliseconds
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    matchDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  let status = "";
  if (currentMatch) {
    status = "Match In Progress";
  } else if (courtStatus) {
    status = "Available";
  } else {
    status = "Unavailable";
  }

  return (
    <div className="relative bg-[#112240] rounded-xl p-6 border border-[#1e3a8a]/30 shadow-lg hover:shadow-xl transition-shadow">
      {/* Overlay lock if above level */}
      {isAboveLevel && (
        <div className="opacity-80 absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#112240]/80 backdrop-blur-sm rounded-xl">
          <img width={"80px"} src="/Icons/lock.png" alt="" />
          <span className="text-lg text-white font-bold">Locked Court</span>
          <span className="text-[1rem] text-[#64ffda] mt-2">Level required: {level}</span>
        </div>
      )}

      {/* Court info (faded if locked) */}
      <div className={isAboveLevel ? "opacity-70 pointer-events-none" : ""}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#64ffda]">
              Court {courtName}
            </h2>
            <p className="text-sm text-[#8892b0]">{level}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${status === "Match In Progress"
              ? "bg-red-900/30 text-red-400"
              : status === "Available"
                ? "bg-green-900/30 text-green-400"
                : "bg-yellow-900/30 text-yellow-400"
              }`}
          >
            {status}
          </span>
        </div>

        {currentMatch && (
          <div className="mb-4 bg-[#1e3a8a]/20 p-3 rounded-lg">
            <h3 className="text-sm font-semibold text-[#ccd6f6] mb-1">
              Current Match:
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#64ffda]">
                  {currentMatch.teamA[0].firstName} & {currentMatch.teamA[1].firstName}
                </p>
                <p className="text-[#64ffda]">
                  vs {currentMatch.teamB[0].firstName} & {currentMatch.teamB[1].firstName}
                </p>
              </div>
              <span className="text-lg font-bold">{matchDuration && `(${matchDuration})`}</span>
            </div>
          </div>
        )}

        <div className="mb-4">
          {inQueue && (
            <h2 className="text-sm font-semibold text-[#38fb32] mb-2">
              Your position is: {Math.floor(queue.findIndex(u => u._id === sessionStorage.getItem('token')) / 2) + 1}
            </h2>
          )}
          <h3 className="text-sm font-semibold text-[#ccd6f6] mb-2">
            {(() => {
              const teams = groupIntoTeams(queue);
              const numTeams = teams.length;
              const numPlayers = queue.length % 2; // 1 if odd, 0 if even

              if (queue.length === 0) {
                return "No teams waiting";
              }
              if (numTeams === 1 && numPlayers === 1) {
                return "1 Player waiting";
              }
              if (numTeams > 0 && numPlayers === 1) {
                return `Queue (${numTeams - 1} ${numTeams === 1 ? "Team" : "Teams"} and 1 Player waiting)`;
              }
              if (numTeams > 0 && numPlayers === 0) {
                return `Queue (${numTeams} ${numTeams === 1 ? "Team" : "Teams"}):`;
              }
              return "";
            })()}
          </h3>
          {queue.length > 0 ? (
            <ul className="space-y-2">
              {groupIntoTeams(queue).slice(0, 3).map((team, i) => (
                <li key={i} className="flex items-center text-[#8892b0]">
                  <span className="w-5 text-[#64ffda]">{i + 1}.</span>
                  <span>
                    {team[0]?.firstName}
                    {team[1] ? ` & ${team[1].firstName}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#8892b0]">No players waiting</p>
          )}
        </div>

        <button
          onClick={() => handleQueueClick()}
          className={`w-full py-2 rounded-md font-medium transition-all ${inQueue
            ? "bg-gradient-to-r from-[#ff5555] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff5555]"
            : "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a]"
            }`}
        >
          {inQueue ? "Leave Queue" : "Join Queue"}
        </button>
      </div>
    </div>
  );
}

export default Court;
