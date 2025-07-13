import React, { createContext, useContext, useState } from "react";
import { UserType } from "../hooks/useUser";
import { MatchesType } from "../hooks/useMatches";

interface OngoingMatchContextType {
  courtId: string;
  setCourtId: (id: string) => void;
  fourPlayers: UserType[] | null;
  setfourPlayers: (players: UserType[] | null) => void;
  ongoingMatch: MatchesType | null;
  setOngoingMatch: (match: MatchesType | null) => void;
}

const OngoingMatchContext = createContext<OngoingMatchContextType | undefined>(undefined);

export const OngoingMatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courtId, setCourtId] = useState("");
  const [fourPlayers, setfourPlayers] = useState<UserType[] | null>(null);
  const [ongoingMatch, setOngoingMatch] = useState<MatchesType | null>(null);

  return (
    <OngoingMatchContext.Provider value={{ courtId, setCourtId, fourPlayers, setfourPlayers, ongoingMatch, setOngoingMatch }}>
      {children}
    </OngoingMatchContext.Provider>
  );
};

export function useOnGoingMatch() {
  const ctx = useContext(OngoingMatchContext);
  if (!ctx) throw new Error("useOnGoingMatch must be used within OngoingMatchProvider");
  return ctx;
}