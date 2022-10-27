import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

function Loading() {
  return (
    <div className="bg-[#091818] h-screen flex flex-col items-center justify-center">
        <div className='flex items-center space-x-2 mb-10'>
            <img className="rounded-full h-20 w-20" src="https://i.ibb.co/M5mJYPv/5df33d9d-4977-4a25-ba5a-abfe87d19db0.jpg" />
            <h1 className="text-lg text-white font-bold">Loading the GYANI DRAW</h1>
        </div>
        <PropagateLoader size={30} color="white" />
    </div>
  )
};

export default Loading;