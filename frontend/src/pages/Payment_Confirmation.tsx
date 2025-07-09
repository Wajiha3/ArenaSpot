import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Payment_Confirmation() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="bg-black min-h-screen text-white p-6 flex flex-col">
     
      <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
       
        <div className='flex items-center h-[34px]'>
            <button className="text-white text-lg">{"< back"}</button>
        </div>

        <div className="h-[34px] flex gap-2">
            <img width={"34px"} src="/Icons/notifications.png" alt="" />
        </div>
      </div>

      {/* Main content, moved up */}
      <div className="flex flex-col items-center mt-8">
        {/* Check In title */}
        <h1 className="text-3xl font-bold mb-16">Check In</h1>

        {/* Success icon (optional) */}
        <div className="mt-8 w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-20 w-20 text-white" 
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
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Payment</h2>
          <p className="text-2xl font-semibold">Successful!</p>
        </div>

      </div>
    </div>
  );
};


export default Payment_Confirmation;