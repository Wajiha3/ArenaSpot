import React, { useState } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import InputBox from "../Components/InputBox";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noSee, setNoSee] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    const data = {
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:3033/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const resData = await response.json();
        sessionStorage.setItem("token", resData.token);
        navigate("/welcome");
      } else {
        const resData = await response.json();
        // Map backend error to field
        let fieldErrors: { [key: string]: string } = {};
        if (resData.error === "Invalid password!") {
          fieldErrors.password = "Incorect password";
          setPassword("");
        }
        if (resData.error === "Email not found!") {
          fieldErrors.email = "This email doesn't exist";
          setEmail("");
        }
        setErrors(fieldErrors);
      }
    } catch (err) {
      setErrors({ form: "Network error" });
    }
  };

  return (
    <div className="bg-[#011937] h-screen w-screen text-white pt-[2rem]">
      <div className="ml-[2rem] w-[5rem] h-[5.4rem]">
        <img src="/logo1.png" alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-[100%]">
        <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem]">Login</p>
        <form
          className="w-[90%] flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <InputBox
            icon="/Icons/email.png"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <div
            className={`mt-[1rem] flex items-center w-[90%] rounded-[20px] h-[3.5rem] pr-2 bg-[#F0F0F0] ${
              errors.password ? "border-2 border-red-500" : ""
            }`}
          >
            <img
              className="ml-[1rem]"
              width={"34px"}
              src="/Icons/key.png"
              alt=""
            />
            <input
              className="ml-[1rem] mr-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[100%] h-full outline-none"
              type={noSee ? "password" : "text"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              onClick={() => setNoSee(!noSee)}
              width={"34px"}
              src="/Icons/watch.png"
              alt=""
            />
          </div>
          {errors.password && (
            <div className="text-red-500 w-[90%] text-left">
              {errors.password}
            </div>
          )}
          <button
            type="submit"
            className="hover:bg-gradient-to-tr from-[#33cccc] from-23% to-[#0099ff] to-54% bg-gradient-to-b from-[#0099cc] to-[#003399] text-[1.5rem] rounded-[27px] font-bold w-[90%] h-[3.5rem] mt-10 mb-[2rem] flex justify-center items-center gap-1"
          >
            Get Started{" "}
            <img width={"40px"} src="/Icons/arrow-small-right.png" alt="" />
          </button>
        </form>
        <div className="mt-[2rem] flex items-center gap-5">
          <div className="w-[8rem] h-[0.2rem] bg-[#FFF]" />
          <span>or</span>
          <div className="w-[8rem] h-[0.2rem] bg-[#FFF]" />
        </div>
        <div className="mt-[1rem] flex gap-10">
          <img width={"34px"} src="/Icons/google.png" alt="" />
          <img width={"34px"} src="/Icons/instagram.png" alt="" />
          <img width={"34px"} src="/Icons/facebook.png" alt="" />
        </div>
        <p className="mt-[4rem] mb-[4rem]">
          Don’t have an account?
          <span
            className="ml-2 text-green-700"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
