import { BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';

function Queues() {
    const navigate = useNavigate();

    return (
        <div className="bg-black w-screen text-black pt-[2rem]">
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
                <p className="text-[2rem] font-bold mt-[2rem] mb-[2rem] text-white">Court Queues</p>
                <p className="text-[2rem] font-bold text-white mb-4">Court 1 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10'>
                    <div>
                        <span className='font-bold mr-2'>Status:</span>
                        <span>Match in Progress</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Current Match:</span>
                        <span>Team A vs Team B</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Queue Length:</span>
                        <span>3 Teams</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#264879] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Join Queue</button>
                </div>

                <p className="text-[2rem] font-bold text-white mb-4">Court 2 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10'>
                    <div>
                        <span className='font-bold mr-2'>Status:</span>
                        <span>Match in Progress</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Current Match:</span>
                        <span>Team A vs Team B</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Queue Length:</span>
                        <span>3 Teams</span>
                    </div>
                    <div className='text-[#68C46B] mt-3 mb-3 font-bold'>
                        <span>You are in this queue</span>
                        <span>(Position: 1)</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#C34447] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Leave Queue</button>
                </div>

                <p className="text-[2rem] font-bold text-white mb-4">Court 3 (Futvolley)</p>
                <div className='flex flex-col items-center rounded-[20px] bg-[#FFF] w-[100%] text-[1.25rem] p-[2rem] mb-10'>
                    <div>
                        <span className='font-bold mr-2'>Status:</span>
                        <span>Match in Progress</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Current Match:</span>
                        <span>Team A vs Team B</span>
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Queue Length:</span>
                        <span>3 Teams</span>
                    </div>
                    <p className='font-bold mt-5'>Queue</p>
                    <ol className='text-[1.25rem] list-decimal mt-3'>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                        <li className=''>Lucas & Marcus</li>
                    </ol>
                    <button className='bg-[#264879] text-[1.5rem] rounded-[25px] font-bold w-[100%] h-[3rem] text-white mt-5'>Join Queue</button>
                </div>
            </div>
        </div>
    );
}

export default Queues;