import React, { useState } from 'react';
import {  BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';
import InputBox from '../Components/InputBox';

function SignUp() {
  const [noSee, setNoSee] = useState(true);
  const [noSee2, setNoSee2] = useState(true);
  const [position, setPosition] = useState("Right"); 
  const navigate = useNavigate();

  return (
    <div className="bg-black h-screen w-screen text-white pt-[2rem]">
      <div className="ml-[2rem] w-[3.6rem] h-[5.4rem]">
        <img src="/logo.png" alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-[100%] pb-[4rem]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem]">Sign Up</p>
        <form className="w-[90%] flex flex-col items-center" action="" method="post">
          <InputBox icon="/Icons/name.png" type="text" placeholder="Username" />
          <InputBox icon="/Icons/name.png" type="text" placeholder="First Name" />
          <InputBox icon="/Icons/name.png" type="text" placeholder="Last Name" />
          <InputBox icon="/Icons/email.png" type="email" placeholder="Email" />
          <InputBox icon="/Icons/birth.png" type="number" placeholder="Birthdate" />
          <div className="mt-[1rem] flex items-center bg-[#F0F0F0] w-[90%] rounded-[20px] h-[3.5rem] pr-2">
            <img className="ml-[1rem]" width={"34px"} src="/Icons/key.png" alt="" />
            <input className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[100%]" type={noSee ? "password":"text"} placeholder="Password" required />
            <img onClick={() => setNoSee(!noSee)} width={"34px"} src="/Icons/watch.png" alt="" />
          </div>
          <div className="mt-[1rem] mb-[3rem] flex items-center bg-[#F0F0F0] w-[90%] rounded-[20px] h-[3.5rem] pr-2">
            <img className="ml-[1rem]" width={"34px"} src="/Icons/key.png" alt="" />
            <input className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[100%]" type={noSee2 ? "password":"text"} placeholder="Confirm Password" required />
            <img onClick={() => setNoSee2(!noSee2)} width={"34px"} src="/Icons/watch.png" alt="" />
          </div>

          <div className='flex gap-2 mb-5'>
            <img width={"34px"} src="/Icons/side.png" alt="" />
            <p className='text-[1.5rem] font-bold'>Position</p>
          </div>
          <div className='bg-[#F0F0F0] rounded-[20px] mb-[3rem] text-[1.25rem] font-bold w-[90%] flex shadow-md h-[3.5rem]'>
            <button
              type='button'
              className={`flex-1 h-full rounded-l-[20px] tracking-wide transition-colors duration-200
                ${position === "Right"
                  ? "bg-[#68C46B] text-white shadow-inner"
                  : "bg-[#F0F0F0] text-black"}
              `}
              onClick={() => setPosition("Right")}
            >
              Right
            </button>
            <button
              type='button'
              className={`flex-1 h-full tracking-wide transition-colors duration-200
                ${position === "Left"
                  ? "bg-[#FF9800] text-white shadow-inner"
                  : "bg-[#F0F0F0] text-black"}
              `}
              onClick={() => setPosition("Left")}
            >
              Left
            </button>
            <button
              type='button'
              className={`flex-1 h-full rounded-r-[20px] tracking-wide transition-colors duration-200
                ${position === "Both"
                  ? "bg-[#2096F3] text-white shadow-inner"
                  : "bg-[#F0F0F0] text-black"}
              `}
              onClick={() => setPosition("Both")}
            >
              Both
            </button>
          </div>
          <button type="submit" className='bg-[#68C46B] text-[1.5rem] rounded-[27px] font-bold w-[90%] h-[3.5rem] flex justify-center items-center gap-1'>Get Started <img width={"40px"} src="/Icons/arrow-small-right.png" alt="" /></button>
        </form>
        <div className="mt-[4rem] flex items-center gap-5" >
          <div className="w-[8rem] h-[0.2rem] bg-[#FFF]" />
          <span>or</span>
          <div className="w-[8rem] h-[0.2rem] bg-[#FFF]" />
        </div>
        <div className="mt-[1rem] flex gap-10">
          <img width={"34px"} src="/Icons/google.png" alt="" />
          <img width={"34px"} src="/Icons/instagram.png" alt="" />
          <img width={"34px"} src="/Icons/facebook.png" alt="" />
        </div>
        <p className="mt-[4rem]">Already  have an account?<span onClick={() => navigate('/login')} className='ml-2 text-green-700'>Sign In</span></p>
      </div>
    </div>
  );
}

export default SignUp;