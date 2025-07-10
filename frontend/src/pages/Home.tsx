import { BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='bg-black h-screen w-screen flex flex-col justify-center text-white items-center pt-[15rem]'>
      <div className='z-1'>
        <img width={"386px"} src="/home_image.png" alt="Image of tennis" />
      </div>
      <div className=' bg-[#242424] h-[80%] w-[90%] rounded-[22px] flex justify-center flex-col items-center opacity-90 relative top-[-5rem]'>
        <p className='pt-[2rem] text-[2rem] font-bold mb-[4rem] w-[80%] text-center'>Focus on your purpose!</p>
        <button
          className='bg-[#68C46B] text-[2rem] rounded-[27px] font-bold w-[90%] h-[4.5rem] mb-[2rem]'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <p className='mb-[5rem] text-[1rem] font-bold'>Already have an account? <span className='ml-1 text-green-700'>Register</span></p>
      </div>
    </div>
  );
}
export default Home;

