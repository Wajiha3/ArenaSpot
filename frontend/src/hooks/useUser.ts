import { error } from "console";
import { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";

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
  points: number;
}

export function useUser() {
  const [user, setUser] = useState<UserType | null>(null);
  const [checkInUsers, setCheckInUsers] = useState(0);

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

    const fetchCheckInUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3007/api/users/checkedin/count`, {
        method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            setCheckInUsers(await res.json());
        } 
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

  useEffect(() => {
    
    fetchCheckInUsers(); // Fetch check-in users count
    fetchUser(); // Initial fetch

    const interval = setInterval(fetchUser, 15000); // Fetch every 15 seconds
    const intervalCheckIn = setInterval(fetchCheckInUsers, 15000); // Fetch check-in users count every 15 seconds

    return () => {
      clearInterval(interval); // Cleanup on unmount
      clearInterval(intervalCheckIn); // Cleanup on unmount
    };
  }, []);

  return { user, checkInUsers };
}