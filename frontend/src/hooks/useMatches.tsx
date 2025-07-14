import { get } from "http";
import { useState, useEffect } from "react";
import Matches from "../pages/Matches";

export interface UserType {
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

export interface MatchesType {
  _id: string;
  _courtId: string;
  teamA: UserType[];
  teamB: UserType[];
  status: string;
  winningTeam: string;
  started: Date;
  finished: Date;
  score: {teamA: number; teamB: number} | null;
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function useMatches() {
  const [matches, setMatches] = useState<MatchesType[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const statsRes = await fetch(`http://localhost:3007/api/${sessionStorage.getItem('token') || ''}/matches`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          
          setMatches(statsData);
        }
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    };
    fetchMatches();
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, []);

  // Helper to parse date
  const parseDate = (d: Date | string) => new Date(d);

  const getLast3Matches = () => {
    return matches.slice(0,3);
  };

  // 1. Matches played today
  const getMatchesToday = () => {
    const today = new Date();
    return matches.filter(m => isSameDay(parseDate(m.finished), today));
  };
  

  // 2. Matches played last week (last 7 days, including today)
  const getMatchesLastWeek = () => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6); // 7 days including today
    return matches.filter(m => {
      const finished = parseDate(m.finished);
      return finished >= weekAgo && finished <= today;
    });
  };

  // 3. Matches played last month (last 30 days, including today)
  const getMatchesLastMonth = () => {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setDate(today.getDate() - 29); // 30 days including today
    return matches.filter(m => {
      const finished = parseDate(m.finished);
      return finished >= monthAgo && finished <= today;
    });
  };

  // 4. Matches played last year (last 365 days, including today)
  const getMatchesLastYear = () => {
    const today = new Date();
    const yearAgo = new Date();
    yearAgo.setDate(today.getDate() - 364); // 365 days including today
    return matches.filter(m => {
      const finished = parseDate(m.finished);
      return finished >= yearAgo && finished <= today;
    });
  };

  const getAllMatches = () => matches;

  return {
    getLast3Matches,
    getMatchesToday,
    getMatchesLastWeek,
    getMatchesLastMonth,
    getMatchesLastYear,
    getAllMatches,
  };
}