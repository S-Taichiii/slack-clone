import React from 'react'
import ChatList from './ChatContainer/ChatList'
import MessageArea from './ChatContainer/MessageArea'

function ChatContainer() {
  return (
    <div className='flex flex-grow h-screen'>
        <ChatList />
        <MessageArea />
    </div>
  )
}

export default ChatContainer