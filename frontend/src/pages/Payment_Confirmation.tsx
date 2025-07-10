import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Payment_Confirmation() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="bg-black min-h-screen text-white p-6 flex flex-col">
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
        <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg" onClick={() => navigate('/welcome')}>{"< back"}</button>
        </div>
  
      </div>
      <div className="text-center mb-8 text-2xl font-bold mb-16 mt-11">
        <h1 className="text-center font-bold text-[2rem] mb-[2rem]">Check In</h1>
      </div>
      <div className="flex flex-col items-center flex-1 justify-start mt-4">
        {/* Success icon (centered, moved up) */}
        <div className="mt-14 w-40 h-40 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-30 w-30 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        {/* Payment success message */}
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold mb-2">Payment</h2>
          <p className="text-2xl font-semibold">Successful!</p>
        </div>
      </div>
    </div>
  );
};


export default Payment_Confirmation;