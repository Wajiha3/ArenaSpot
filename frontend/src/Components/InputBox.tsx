import React from 'react';

interface InputBoxProps {
  icon: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

function InputBox({ icon, type, placeholder, value, onChange, error, errorMessage }: InputBoxProps) {
  return (
    <div className={`mt-[1rem] flex flex-col items-center w-[90%]`}>
      <div className={`flex items-center bg-[#F0F0F0] rounded-[20px] h-[3.5rem] pr-5 w-full ${error ? 'border-2 border-red-500' : ''}`}>
        <img className="ml-[1rem]" width={34} src={icon} alt="" />
        <input
          className="ml-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[90%]"
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
      </div>
      {error && errorMessage && (
        <div className="text-red-500 text-left w-full pl-4 text-[0.95rem]">{errorMessage}</div>
      )}
    </div>
  );
}

export default InputBox;