import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../Components/InputBox';

function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noSee, setNoSee] = useState(true);
  const [noSee2, setNoSee2] = useState(true);
  const [position, setPosition] = useState('Right');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    const data = {
      userName: username,
      firstName,
      lastName,
      email,
      birthDate: birthdate,
      password,
      passwordConfirmation: confirmPassword,
      position,
    };
    try {
      const response = await fetch('http://localhost:3007/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate('/welcome');
      } else {
        const resData = await response.json();
        // Map backend error to field
        let fieldErrors: { [key: string]: string } = {};
        if (resData.error === "Passwords don't match") {
          fieldErrors.password = "Passwords do not match";
          fieldErrors.confirmPassword = "Passwords do not match";
          setPassword('');
          setConfirmPassword('');
        }
        if (resData.error === "Username already exists") {
          fieldErrors.username = "Username already exists";
          setUsername('');
        }
        if (resData.error === "Email already exists") {
          fieldErrors.email = "Email already exists";
          setEmail('');
        }
        if (resData.error === "There is blank spaces") {
          fieldErrors.form = "Please fill in all fields";
        }
        setErrors(fieldErrors);
      }
    } catch (err) {
      setErrors({ form: "Network error" });
    }
  };

  return (
    <div className="bg-black h-screen w-screen text-white pt-[2rem]">
      <div className="ml-[2rem] w-[3.6rem] h-[5.4rem]">
        <img src="/logo.png" alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-[100%] pb-[4rem]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem]">Sign Up</p>
        <form className="w-[90%] flex flex-col items-center" onSubmit={handleSubmit}>
          {errors.form && <div className="mb-4 text-red-500 font-bold">{errors.form}</div>}
          <InputBox
            icon="/Icons/name.png"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            error={!!errors.username}
            errorMessage={errors.username}
          />
          <InputBox
            icon="/Icons/name.png"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <InputBox
            icon="/Icons/name.png"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <InputBox
            icon="/Icons/email.png"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <InputBox
            icon="/Icons/birth.png"
            type="date"
            placeholder="Birthdate"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
          />
          <div className={`mt-[1rem] flex items-center w-[90%] rounded-[20px] h-[3.5rem] pr-2 bg-[#F0F0F0] ${errors.password ? 'border-2 border-red-500' : ''}`}>
            <img className="ml-[1rem]" width={"34px"} src="/Icons/key.png" alt="" />
            <input className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[100%]"
              type={noSee ? "password" : "text"}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <img onClick={() => setNoSee(!noSee)} width={"34px"} src="/Icons/watch.png" alt="" />
          </div>
          {errors.password && <div className="text-red-500 w-[90%] text-left">{errors.password}</div>}
          <div className={`mt-[1rem] flex items-center w-[90%] rounded-[20px] h-[3.5rem] pr-2 bg-[#F0F0F0] ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}>
            <img className="ml-[1rem]" width={"34px"} src="/Icons/key.png" alt="" />
            <input className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[100%]"
              type={noSee2 ? "password" : "text"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <img onClick={() => setNoSee2(!noSee2)} width={"34px"} src="/Icons/watch.png" alt="" />
          </div>
          {errors.confirmPassword && <div className="text-red-500 mb-2 w-[90%] text-left">{errors.confirmPassword}</div>}

          <div className='flex gap-2 mb-5 mt-[2rem]'>
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