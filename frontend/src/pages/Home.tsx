import { BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='bg-black min-h-screen w-screen flex flex-col justify-center items-center text-white'>
      <div className='z-10'>
        <img width={"386px"} src="/home_image.png" alt="Image of tennis" />
      </div>
      <div className='bg-[#242424] w-[90%] rounded-[22px] flex flex-col justify-center items-center opacity-90 -mt-16 z-20 pb-8 pt-8'>
        <p className='text-[2rem] font-bold mb-[4rem] w-[80%] text-center'>Focus on your purpose!</p>
        <button
          className='bg-[#68C46B] text-[2rem] rounded-[27px] font-bold w-[90%] h-[4.5rem] mb-[2rem]'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <p className='mb-[2rem] text-[1rem] font-bold'>Don’t have an account? <span onClick={() => navigate('/signup')} className='ml-1 text-green-700'>Register</span></p>
      </div>
    </div>
  );
}
export default Home;