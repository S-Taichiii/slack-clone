import React from 'react'
import ChatList from './ChatContainer/ChatList'
import ChatArea from './ChatContainer/ChatArea'

function ChatContainer() {
  return (
    <div className='flex flex-grow h-screen'>
        <ChatList />
        <ChatArea />
    </div>
  )
}

export default ChatContainer