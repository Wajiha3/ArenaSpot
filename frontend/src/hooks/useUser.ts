import { error } from "console";
import { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";

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
  points: number;
}

export function useUser() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3007/api/user/${sessionStorage.getItem('token')}`, {
        method: 'GET',
          headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
        });
        if (res.ok) {
            setUser(await res.json());
        } 

      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUser();

    fetchUser(); // Initial fetch

    const interval = setInterval(fetchUser, 15000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return { user };
}