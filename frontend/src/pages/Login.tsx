import React, { useState } from 'react';
import {  BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';
import InputBox from '../Components/InputBox';

function Login() {
    const [noSee, setNoSee] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="bg-black h-screen w-screen text-white pt-[2rem]">
            <div className="ml-[2rem]  w-[3.6rem] h-[5.4rem]">
                <img src="/logo.png" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center w-[100%]">
                <p className="text-[2rem] font-bold mt-[2rem] mb-[5rem]">Login</p>
                <form className="w-[90%] flex flex-col items-center" action="" method="post">
                    <InputBox icon="/Icons/email.png" type="email" placeholder="Email" />
                    <div className="mt-[1rem] mb-[3rem] flex items-center bg-[#F0F0F0] w-[90%] rounded-[20px] h-[3.5rem]">
                        <img className="ml-[1rem]" width={"34px"} src="/Icons/key.png" alt="" />
                        <input className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[63%]" type={noSee ? "password":"text"} placeholder="Password" required/>
                        <img onClick={() => setNoSee(!noSee)} width={"34px"} src="/Icons/watch.png" alt="" />   
                    </div>
                    <button type="submit" className='bg-[#68C46B] text-[1.5rem] rounded-[27px] font-bold w-[90%] h-[3.5rem] mb-[2rem] flex justify-center items-center gap-1'>Get Started <img width={"40px"} src="/Icons/arrow-small-right.png" alt="" /></button>
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
                <p className="mt-[8rem]">Don’t have an account?<span className='ml-2 text-green-700' onClick={() => navigate('/signup')}>Sign Up</span></p>
            </div>
        </div>
    );
}

export default Login;

