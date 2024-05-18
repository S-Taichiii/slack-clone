import React from 'react'

function ChatList() {
  return (
    <div className='w-64 bg-gray-800'>
        <div className="py-4 px-2 border-b border-gray-300">
            <span className='font-bold text-gray-300'>チャンネル</span>
        </div>
        <div className='overflow-y-auto'>
            <div className='py-1 px-4 hover:bg-gray-700'>
                <p className='text-gray-300 hover:text-white'>#random</p>
            </div>
        </div>
        <div className='px-4 py-2'>
            <button className='text-gray-300 hover:text-white'>＋チャンネルを追加</button>
        </div>
    </div>
  )
}

export default ChatList