import React from 'react';
import { objects } from '../constants';

const Home = () => {
  return (
    <div className='bg-pink-300 h-screen w-screen'>
      
      <div className='flex gap-5 absolute z-0'>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className='flex flex-col gap-2'>
            {Array.from({ length: 4 }, (_, j) => (
              <img key={j} src={objects[j]} alt={`Object ${j}`} height={30} width={30} />
            ))}
          </div>
        ))}
      </div>

      <div className='flex gap-1 items-center px-1 absolute z-[1] w-full'>
        <div className='w-[32px] bg-pink-200 h-[30px] rounded-[30%] hover:bg-pink-100'></div>
        <div className='bg-pink-200 h-[38px] rounded-t-[50%] w-[15%]'>
          <img src="" alt="" />
        </div>
      </div>

      <div className='bg-white h-[calc(100%-38px)] absolute w-full z-[1] top-[38px] overflow-hidden'>
        <div className="bg-pink-200 w-full h-[8%] flex items-center px-2 gap-3">
          <div className='flex gap-2'>
            <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px]' src="src/assets/left.svg" alt="left"  height={30} width={30}/>
            <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px]' src="src/assets/right.svg" alt="right" height={30} width={30}/>
            <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px] px-[2.5px]' src="src/assets/refresh.svg" alt="refresh" height={30} width={30}/>
          </div>
          <input className='bg-pink-800 text-white rounded-2xl px-5 py-[5px] w-[80%] cursor-default' type="text" placeholder='https:/ScamHolder.com/Educational?True'/>
        </div>
        <div className='grid grid-cols-4 grid-rows-3 w-full h-full gap-x-4 gap-y-3 p-3'>
        <div className='bg-gray-100' onClick={() => Navigate("/scam1")}></div>
        <div className='bg-gray-100'></div>
        <div className='bg-gray-100'></div>
        <div className='bg-gray-100'></div>
        <div className='bg-gray-100'></div>
        <div className='bg-gray-100'></div>
        <div className='bg-gray-100'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
