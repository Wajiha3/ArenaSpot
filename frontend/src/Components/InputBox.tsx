
interface InputBoxProps {
  icon: string;
  type: string;
  placeholder: string;
}

function InputBox({icon, type, placeholder} : InputBoxProps) {
  
  return (
      <div className="mt-[1rem] flex items-center bg-[#F0F0F0] w-[90%] rounded-[20px] h-[3.5rem]">
          <img className="ml-[1rem]" width={"34px"} src={icon} alt="" />
          <input className="ml-[1rem] text-black text-[20px] bg-transparent placeholder-black placeholder:text-[20px] w-[63%]" type={type} placeholder={placeholder} required />
      </div>
  );
}

export default InputBox;