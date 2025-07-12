import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; // Ensure this path is correct

function Check_In() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedNav, setSelectedNav] = useState('Home');

  const handlePaymentSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
    setIsVerified(false); // Reset verification when token changes
  };

  const handleVerifyToken = () => {
    // Add your token verification logic here
    console.log('Verifying token:', token);
    // For demo purposes, we'll just set it to "verified" if not empty
    if (token.trim() !== '') {
      setIsVerified(true);
    }
  };

  return (
    <div className="min-h-screen w-screen text-white pt-4">

         <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
       
        <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg" onClick={() => navigate('/welcome')}>{"< back"}</button>
        </div>

        <div className="h-[34px] flex gap-2">
            <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>


        <div className="text-center mb-8 text-2xl font-bold mb-16 mt-11">
      <h1 className="text-center font-bold text-[2rem] mt-[2rem] mb-[2rem]">Check In</h1>
     </div>

     <div className="text-center mb-8 text-lg mb-16 mt-11">
      <p className='text-white text-center mb-6'>You are within 250m of Arena Footvolley. Please select a payment method to check in.</p>
     </div>

      <div className="bg-white text-center text-black p-6 rounded-lg border border-gray-700 max-w-md mb-6 mx-auto">
      <h2 className="text-center font-bold text-xl mb-4">Payment Options</h2>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-center text-black">Day Use Fee</p>
          <p className="text-black text-center">R$25.00</p>
        </div>
        <div
          className={`w-full px-4 py-2 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-pointer ${selectedOption === 'creditCard' ? 'bg-gray-800' : 'bg-[#2096F3]'}`}
          onClick={() => handlePaymentSelect('creditCard')}
        >
          <span className="font-bold" onClick={() => navigate('/paymentconfirmation')}>Pay with Credit Card</span>
        </div>
        <div
          className={`w-full px-4 py-2 bg-green-700 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${selectedOption === 'applePay' ? 'bg-gray-800' : 'bg-gray-700'} cursor-pointer`}
          onClick={() => handlePaymentSelect('applePay')}
        >
          <span className="font-bold" onClick={() => navigate('/paymentconfirmation')}>Pay with Apple Pay</span>
        </div>
      </div>
      </div>

      <div className="bg-white text-center text-black p-6 rounded-lg border border-gray-700 max-w-md mt-6 mb-20 mx-auto">
        <h2 className="text-xl text-black font-bold mb-4">Reception Payment</h2>
        <p className="text-black text-center mb-4">Enter token provided by reception:</p>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="token-input" className="block text-sm font-medium text-black mb-1">
              Enter token:
            </label>
            <input
              id="token-input"
              type="text"
              value={token}
              onChange={handleTokenChange}
              placeholder="Paste your token here"
              className="w-full px-4 py-2 bg-[#C8E6FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button
            onClick={() => {
              handleVerifyToken();
              if (token.trim()) {
                navigate('/paymentconfirmation');
              }
            }}
            disabled={!token.trim()}
            className={`px-4 py-2 rounded-md bg-orange-700 font-bold ${token.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'} transition-colors`}
          >
            Verify Token
          </button>
          {isVerified && (
            <div className="mt-2 p-2 bg-green-900 text-green-300 rounded-md text-sm">
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