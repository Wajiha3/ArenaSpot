import { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";

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


    // 1. Matches played today
    const joinCourt = async (_idCourt : string) => {
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


    // 1. Matches played today
    const leaveCourt = () => {
        
        return 
    }; 

      return { courts, isLoading , joinCourt }; // Return the state and functions
}      