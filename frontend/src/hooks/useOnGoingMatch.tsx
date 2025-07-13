import { useState, useEffect } from "react";
import { UserType } from "../hooks/useUser";

export function useOnGoingMatch() {
    const [courtId, setCourtId] = useState("");
    const [fourPlayers, setfourPlayers] = useState<UserType[] | null>(null);
    const [matchDuration, setMatchDuration] = useState<UserType[] | null>(null);

    return { courtId, setCourtId, fourPlayers, setfourPlayers, matchDuration, setMatchDuration }; // Return the state and functions
}