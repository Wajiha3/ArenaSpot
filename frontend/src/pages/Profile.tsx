import React, { useState } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Ensure this path is correct
import { useUser } from "../hooks/useUser";

function Profile() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Profile");
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const { user } = useUser();

  const handleClick = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="w-screen text-white pt-[2rem] pb-[5rem]">
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
            <p className="text-[2rem] font-bold">{user?.userName}</p>
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
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Date of birth</span>
            <span>
              {user?.birthDate ? user.birthDate.split("-").reverse().join("/"): ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Password</span>
            <span>{user?.password ? "●".repeat(user.password.length) : ""}</span>
          </div>
          <div className="flex justify-between">
            <span>Position</span>
            <span>{user?.position}</span>
          </div>

          <button
            className="mt-14 bg-[#C34447] text-[1.5rem] text-white rounded-[25px] font-bold w-[100%] h-[3.3rem]"
            onClick={() => handleClick()}
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
