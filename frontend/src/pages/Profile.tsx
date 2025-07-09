import { BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    return (
        <div className="bg-black w-screen text-white pt-[2rem] pb-[5rem]">
            <div className="ml-[2rem] mr-[2rem] flex justify-between items-center">
                <div className='w-[3.6rem] h-[5.4rem]'>
                    <img src="/logo.png" alt="" />
                </div>
                <div className="h-[34px] flex gap-2">
                    <img width={"34px"} src="/Icons/notifications.png" alt="" />
                    <img width={"34px"} src="/Icons/search.png" alt="" />
                    <img width={"34px"} src="/Icons/menu.png" alt="" />
                </div>
            </div>
            <div className="flex flex-col items-center w-[100%] px-[1rem]">
                <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">My Profile</p>
                <div className='flex items-center self-start ml-[2rem]'>
                    <img width={"70px"} src="/Icons/profile_picture.png" alt="" />
                    <div className='ml-[1rem]'>
                        <p className='text-[2rem] font-bold'>LilPaki</p>
                        <p className='text-[1.25rem]'>Lisbon, Portugal</p>
                    </div>
                </div>
                <div className='mt-5 flex items-center justify-between self-start w-full'>
                    <p className='text-[2rem] font-bold'>Personal Details</p>
                    <img width={"34px"} src="/Icons/settings.png" alt="" />
                </div>

                <div className='mt-5 w-full text-[1.5rem]'>
                    <div className='flex justify-between'>
                        <span>Email</span>
                        <span>abc@gmail.com</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Date of birth</span>
                        <span>05/10/2002</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Password</span>
                        <span>********</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Position</span>
                        <span>Left</span>
                    </div>
                </div>

                <div className='mt-10 flex items-center justify-between self-start w-full'>
                    <p className='text-[2rem] font-bold'>My Matches</p>
                    <img width={"34px"} src="/Icons/filter.png" alt="" />
                </div>

                <div className='mt-5 grid grid-cols-2 grid-rows-2 gap-y-5 w-[80%]'>
                    <div className='flex justify-center'>
                        <button className='w-[8rem] h-10 bg-[#68C46B] text-[1.25rem] font-bold rounded-[20px]'>Today</button>
                    </div>
                    <div className='flex justify-center'>
                        <button className='w-[8rem] h-10 bg-[#68C46B] text-[1.25rem] font-bold rounded-[20px]'>Last week</button>
                    </div>
                    <div className='flex justify-center'>
                        <button className='w-[8rem] h-10 bg-[#264879] text-[1.25rem] font-bold rounded-[20px]'>Last month</button>
                    </div>
                    <div className='flex justify-center'>
                        <button className='w-[8rem] h-10 bg-[#68C46B] text-[1.25rem] font-bold rounded-[20px]'>Last year</button>
                    </div>
                </div>

                <div className='mt-5 w-full bg-[#74D8BC] rounded-[20px] p-[1.5rem] text-[1.25rem] font-bold mb-[2rem]'>
                    <div className="flex justify-between">
                        <span>Match 1:</span>
                        <span>Won</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Match 2:</span>
                        <span>Lost</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Match 3:</span>
                        <span>Won</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;