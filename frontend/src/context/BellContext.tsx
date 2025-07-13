import React, { createContext, useContext, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface BellContextType {
  bellRing: boolean;
  setBellRing: React.Dispatch<React.SetStateAction<boolean>>;
  handleBellClick: () => void;
  notify: () => void;
}

const BellContext = createContext<BellContextType | undefined>(undefined);

export const BellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bellRing, setBellRing] = useState(false);
  const navigate = useNavigate();

  const notify = () => toast.info('Your match is starting hurry up!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    onClick: () => navigate("/LiveMatch"),
  });

  const handleBellClick = () => {
    navigate("/LiveMatch");
  };

  return (
    <BellContext.Provider value={{ bellRing, setBellRing, handleBellClick, notify }}>
      {children}
    </BellContext.Provider>
  );
};

export const useBell = () => {
  const ctx = useContext(BellContext);
  if (!ctx) throw new Error("useBell must be used within a BellProvider");
  return ctx;
};