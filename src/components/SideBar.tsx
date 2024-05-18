import React from 'react'
import { Home, ChatBubble } from "@mui/icons-material";

function SideBar() {
  return (
    <div className='w-16 h-screen bg-gray-900 flex flex-col text-white py-3 items-center'>
        <div className='py-3 flex flex-col items-center'>
            <div className='bg-gray-700 p-2 rounded-lg'>
                <Home />
            </div>
            <span className='text-xs'>Home</span>
        </div>
        <div className='py-3 flex flex-col items-center'>
            <div className='bg-gray-700 p-2 rounded-lg'>
                <ChatBubble />
            </div>
            <span className='text-xs'>DM</span> 
        </div>
        <div className='py-5 px-2 mt-auto flex flex-col items-center'>
            <div className='bg-gray-700 p-2 rounded-lg'>
                <img src='./default-user-icon.png' alt='' />
            </div>
        </div>
    </div>

  )
}

export default SideBar