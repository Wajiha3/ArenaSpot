import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Check_In() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Home");

  const fetchPayement = async () => {
    try {
      const response = await fetch('http://localhost:3007/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem('token') || '' }
      });
      if (response.ok) {
        const data = await response.json();
        
        navigate("/paymentconfirmation");
      } else {
        const resData = await response.json();
        if (resData.error === "Unauthorized") {
          console.error("Unauthorized access");
        }
      }
    } catch (err) {
      console.error("Network error", err);
    } 
  }

  const handlePaymentSelect = (option: string) => {
    setToken("");
    fetchPayement();
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
    setIsVerified(false);
  };

  const handleVerifyToken = () => {
    if (token.trim() !== "") {
      handlePaymentSelect("reception");
      setIsVerified(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#011937] to-[#003366] min-h-screen w-screen text-white pt-4">
      {/* Updated Header with matching back button */}
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div className="flex items-center h-[34px] mt-6">
          <button
            onClick={() => navigate("/welcome")}
            className="text-white hover:text-[#64ffda] transition-colors flex items-center text-lg"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        <div className="h-[34px] flex gap-2 mt-6">
          <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>

      <div className="text-center text-2xl font-bold mb-10 mt-8">
        <h1 className="text-center font-bold text-[2rem] mt-[1rem] mb-[1rem]">
          Check In
        </h1>
      </div>

      <div className="text-center text-lg mb-10 mt-8">
        <p className="text-[#c4dbf3] text-center mb-6">
          You are within 250m of Arena Footvolley. Please select a payment
          method to check in.
        </p>
      </div>

      <div className="bg-white text-center text-black p-5 rounded-xl border border-[#e2e8f0] max-w-md mb-6 mx-auto shadow-lg">
        <h2 className="text-center font-bold text-xl mb-4 text-[#1e3a8a]">
          Payment Options
        </h2>
        <div className="space-y-4 mb-4">
          <div className="bg-[#f0f7ff] p-3 rounded-lg">
            <p className="text-[#1e40af] font-medium">Day Use Fee</p>
            <p className="text-[#1e3a8a] font-bold text-lg">R$25.00</p>
          </div>
          <div
            className={`w-full px-4 py-3 font-bold hover:bg-[#1d4ed8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white cursor-pointer transition-colors ${
              selectedOption === "creditCard" ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
            }`}
            onClick={() => handlePaymentSelect("creditCard")}
          >
            <span className="font-bold">
              Pay with Credit Card
            </span>
          </div>
          <div
            className={`w-full px-4 py-3 font-bold hover:bg-[#166534] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white ${
              selectedOption === "applePay" ? "bg-[#14532d]" : "bg-[#15803d]"
            } cursor-pointer transition-colors`}
            onClick={() => handlePaymentSelect("applePay")}
          >
            <span
              className="font-bold">
              Pay with Apple Pay
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white text-center text-black p-5 rounded-xl border border-[#e2e8f0] max-w-md mt-6 mb-24 mx-auto shadow-lg">
        <h2 className="text-xl text-[#1e3a8a] font-bold mb-4">
          Reception Payment
        </h2>
        <p className="text-[#1e40af] text-center mb-4">
          Enter token provided by reception:
        </p>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="token-input"
              className="block text-sm font-medium text-[#1e40af] mb-2"
            >
              Enter token:
            </label>
            <input
              id="token-input"
              type="text"
              value={token}
              onChange={handleTokenChange}
              placeholder="Paste your token here"
              className="w-full px-4 py-3 bg-[#f0f7ff] border border-[#bfdbfe] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1e3a8a] placeholder-[#93c5fd]"
            />
          </div>
          <button
            onClick={() => {
              handleVerifyToken();
              if (token.trim()) {
                navigate("/paymentconfirmation");
              }
            }}
            disabled={!token.trim()}
            className={`px-4 py-3 rounded-lg font-bold text-white transition-colors ${
              token.trim()
                ? "bg-[#2563eb]"
                : "bg-cyan-400 cursor-pointer hover:bg-cyan-500"
            }`}
          >
            Verify Token
          </button>
          {isVerified && (
            <div className="mt-2 p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded-lg text-sm">
              Token verified successfully!
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Check_In;
