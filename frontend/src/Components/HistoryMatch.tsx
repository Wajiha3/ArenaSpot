import { useNavigate } from "react-router-dom";
import { MatchesType } from "../hooks/useMatches";

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

interface HistoryMatchesProps {
  match: MatchesType;
  idx: number;
}

function HistoryMatch({match, idx}: HistoryMatchesProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between" key={idx} onClick={() => navigate(`/match/${match._courtId}`)}>
      <span className="text-black">
        Match {idx + 1}:
      </span>
      <span
        className={
          (
            (match.winningTeam === "teamA" && match.teamA.some(player => player._id === sessionStorage.getItem("token"))) ||
            (match.winningTeam === "teamB" && match.teamB.some(player => player._id === sessionStorage.getItem("token")))
          )
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {
          (match.winningTeam === "teamA" && match.teamA.some(player => player._id === sessionStorage.getItem("token"))) ||
            (match.winningTeam === "teamB" && match.teamB.some(player => player._id === sessionStorage.getItem("token")))
            ? "Won"
            : "Lost"
        }
      </span>
    </div>
  );
}

export default HistoryMatch;