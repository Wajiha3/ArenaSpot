import React, { useState } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct

function Profile() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Profile");
  const [selectedFilter, setSelectedFilter] = useState("Today");
  // Each filter shows a different subset of matches
  const matchGroups: Record<
    string,
    Array<{ label: string; result: string; link?: string }>
  > = {
    Today: [
      { label: "Match 1:", result: "Won", link: "/match1" },
      { label: "Match 2:", result: "Lost" },
      { label: "Match 3:", result: "Won" },
    ],
    "Last week": [
      { label: "Match 4:", result: "Lost" },
      { label: "Match 5:", result: "Won" },
      { label: "Match 6:", result: "Won" },
      { label: "Match 7:", result: "Lost" },
    ],
    "Last month": [
      { label: "Match 8:", result: "Lost" },
      { label: "Match 9:", result: "Won" },
      { label: "Match 10:", result: "Won" },
    ],
    "Last year": [
      { label: "Match 11:", result: "Lost" },
      { label: "Match 12:", result: "Won" },
      { label: "Match 13:", result: "Lost" },
      { label: "Match 14:", result: "Won" },
    ],
  };

  return (
    <div className="bg-black w-screen text-white pt-[2rem] pb-[5rem]">
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div className="w-[3.6rem] h-[5.4rem]">
          <img src="/logo.png" alt="" />
        </div>
        <div className="h-[34px] flex gap-2">
          <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%] px-[1rem]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">
          My Profile
        </p>
        <div className="flex items-center self-start ml-[2rem]">
          <img width={"70px"} src="/Icons/profile_picture.png" alt="" />
          <div className="ml-[1rem]">
            <p className="text-[2rem] font-bold">LilPaki</p>
            <p className="text-[1.25rem]">Lisbon, Portugal</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between self-start w-full">
          <p className="text-[2rem] font-bold">Personal Details</p>
          <img width={"34px"} src="/Icons/settings.png" alt="" />
        </div>

        <div className="mt-5 w-full text-[1.5rem]">
          <div className="flex justify-between">
            <span>Email</span>
            <span>abc@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span>Date of birth</span>
            <span>05/10/2002</span>
          </div>
          <div className="flex justify-between">
            <span>Password</span>
            <span>********</span>
          </div>
          <div className="flex justify-between">
            <span>Position</span>
            <span>Left</span>
          </div>

          <button
            className="mt-14 bg-[#C34447] text-[1.5rem] text-white rounded-[25px] font-bold w-[100%] h-[3.3rem]"
            onClick={() => navigate("/login")}
          >
            Log Out
          </button>
        </div>
      </div>
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}

export default Profile;
