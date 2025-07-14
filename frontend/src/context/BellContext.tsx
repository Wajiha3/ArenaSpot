import React, { createContext, useContext, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserType } from "../hooks/useUser";

interface BellContextType {
  bellRing: null | { type: "ready" | "ongoing" | "save"; courtId: string };
  setBellRing: React.Dispatch<React.SetStateAction<null | { type: "ready" | "ongoing" | "save"; courtId: string }>>;
  bellTarget: null | { type: "ready" | "ongoing" | "save"; courtId: string };
  setBellTarget: React.Dispatch<React.SetStateAction<null | { type: "ready" | "ongoing" | "save"; courtId: string }>>;
  handleBellClick: () => void;
  notify: (_courtId: string) => void;
  notified: boolean;
  setNotified: React.Dispatch<React.SetStateAction<boolean>>;
  courtId?: string;
  setCourtId: (id: string) => void;
  bellColor: string      
  bellAnimate: boolean;   
}

const BellContext = createContext<BellContextType | undefined>(undefined);

export const BellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bellRing, setBellRing] = useState<null | { type: "ready" | "ongoing" | "save"; courtId: string }>(null);
  const [courtId, setCourtId] = useState<string | undefined>(undefined);
  const [notified, setNotified] = useState(false);
  const [bellTarget, setBellTarget] = useState<null | { type: "ready" | "ongoing" | "save"; courtId: string }>(null);
  const navigate = useNavigate();

  const notify = (_courtId: string) => toast.info('Your match is starting hurry up!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    onClick: () => navigate(`/livematch/${_courtId}`),
  });

  const handleBellClick = () => {
    if (!bellTarget) return;
    if (bellTarget.type === "ready") navigate(`/livematch/${bellTarget.courtId}`);
    if (bellTarget.type === "ongoing") navigate(`/ongoingmatch/${bellTarget.courtId}`);
    if (bellTarget.type === "save") navigate(`/savematch/${bellTarget.courtId}`);
  };

  let bellColor = "#fff";
  let bellAnimate = false;
  if (bellTarget) {
    if (bellTarget.type === "ready") {
      bellColor = "#ff0000"; // red
      bellAnimate = true;
    } else if (bellTarget.type === "ongoing") {
      bellColor = "#ffa500"; // orange
      bellAnimate = true;
    } else if (bellTarget.type === "save") {
      bellColor = "#38fb32"; // green
      bellAnimate = true;
    } else {
      bellColor = "#fff"; // default white
      bellAnimate = false;
    }
  }

  return (
    <BellContext.Provider value={{
      bellRing,
      setBellRing,
      bellTarget,
      setBellTarget,
      handleBellClick,
      notify,
      setNotified,
      notified,
      courtId,
      setCourtId,
      bellColor,
      bellAnimate,  
    }}>
      {children}
    </BellContext.Provider>
  );
};

export const useBell = () => {
  const ctx = useContext(BellContext);
  if (!ctx) throw new Error("useBell must be used within a BellProvider");
  return ctx;
};