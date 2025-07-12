import { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";
import { MatchesType, UserType } from "./useMatches";

interface CourtType {
    _id: string;
    status: boolean;
    courtName: string;
    courtLevel: string;
    queue: any[]; // or a more specific type for players
}

export function useCourts() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [courts, setCourts] = useState<CourtType[]>([]); // <-- use state for courts
    const [isLoading, setIsLoading] = useState(true);
    const [currentMatches, setCurrentMatches] = useState<{ [courtId: string]: MatchesType | null }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:3007/api/allcourts', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourts(data);
                } else {
                    const resData = await response.json();
                    if (resData.error === "Unauthorized") {
                        setErrors({ form: "Unauthorized" });
                    }
                }
            } catch (err) {
                setErrors({ form: "Network error" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 15000); // Fetch every 15 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Fetch current matches for all courts
    const fetchCurrentMatches = async (courtIds: string[]) => {
        const results: { [courtId: string]: MatchesType | null } = {};
        for (const id of courtIds) {
            try {
                const response = await fetch(`http://localhost:3007/api/${id}/matches`, {
                    headers: { 'authorization': sessionStorage.getItem('token') || '' }
                });
                if (response.ok) {
                    results[id] = await response.json();
                } else {
                    results[id] = null;
                }
            } catch (err) {
                results[id] = null;
            }
        }
        console.log("Current matches fetched:", results);
        setCurrentMatches(results);
    };

    // Fetch current matches whenever courts change
    useEffect(() => {
        if (courts.length > 0) {
            fetchCurrentMatches(courts.map(c => c._id));
        }
    }, [courts]);

    // 1. Matches played today
    const joinCourt = async (_idCourt: string) => {
        try {
            const response = await fetch(`http://localhost:3007/api/courts/${_idCourt}/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Joined court successfully:", data);
            } else {
                const resData = await response.json();
                console.error("Failed to join court:", resData);
            }
        } catch (err) {
            console.error('Error joining court:', err);
        }
        return
    };


    const leaveCourt = async (_idCourt: string) => {
        try {
            const response = await fetch(`http://localhost:3007/api/courts/${_idCourt}/leave`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Left court successfully:", data);
            } else {
                const resData = await response.json();
                console.error("Failed to leave court:", resData);
            }
        } catch (err) {
            console.error('Error leaving court:', err);
        }
        return
    };

    return { courts, isLoading, joinCourt, leaveCourt, currentMatches }; // Return the state and functions
}