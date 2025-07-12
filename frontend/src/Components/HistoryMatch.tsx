import { useNavigate } from "react-router-dom";
import { MatchesType } from "../hooks/useMatches";

interface HistoryMatchesProps {
  match: MatchesType;
  idx: number;
}

function HistoryMatch({ match, idx }: HistoryMatchesProps) {
  const navigate = useNavigate();

  // Determine if the logged-in user won
  const userId = sessionStorage.getItem("token");
  const userInTeamA = match.teamA.some(player => player._id === userId);
  const userInTeamB = match.teamB.some(player => player._id === userId);
  const userWon =
    (match.winningTeam === "teamA" && userInTeamA) ||
    (match.winningTeam === "teamB" && userInTeamB);

  // Example: get team names (customize as needed)
  const teamAName = match.teamA.map(p => p.userName).join(" & ");
  const teamBName = match.teamB.map(p => p.userName).join(" & ");

  // Example: score and duration (customize as needed)
  const score = match.score || { teamA: 0, teamB: 0 };
  const start = new Date(match.started).getTime();
const finish = new Date(match.finished).getTime();
const diff = Math.max(0, finish - start); // milliseconds
const minutes = Math.floor(diff / 60000);
const seconds = Math.floor((diff % 60000) / 1000);
const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={`bg-white/10 rounded-xl p-4 border shadow-md hover:shadow-lg transition-all mb-4 cursor-pointer ${
        userWon ? "border-green-400/30" : "border-red-400/30"
      } hover:bg-white/15`}
      onClick={() => navigate(`/match/${match._courtId}`)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-start space-x-2">
            <div
              className={`h-5 w-5 flex items-center justify-center rounded-full ${
                userWon ? "bg-yellow-400" : "bg-red-500"
              }`}
            >
              <span className="text-xs font-bold text-white">
                {userWon ? "W" : "L"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{teamAName}</span>
              <span className="text-lg font-semibold">vs {teamBName}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-white/80">
            <span>Score: {score.teamA}-{score.teamB}</span>
            <span>{duration}</span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`text-lg font-bold ${
              userWon ? "text-green-400" : "text-red-400"
            }`}
          >
            {userWon ? "Won" : "Lost"}
          </span>
          <div className="text-white/50 text-right mt-1">&gt;</div>
        </div>
      </div>
    </div>
  );
}

export default HistoryMatch;