import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import { MessageRef } from '../../type/Message';
import { useAppSelector } from '../../app/hooks';
import { createMessage, subscribeMessage, postMessage } from '../../features/message/messageAPI';
import MessageTile from './MessageTile';

export function MessageArea() {
  const [messageRefs, setMessageRefs] = useState<MessageRef[]>([]);
  const channelId: string = useAppSelector((state) => state.channel.currentChannelId);
  const userId = useAppSelector((state) => state.user.userId);

  const [message, setMessage] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (userId) {
      try {
        // console.log(`userId: ${userId}, channelId: ${channelId}, message: ${message}`);
        await postMessage(createMessage(userId, channelId, message));
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeMessage(channelId, (messageRefs) => {
      setMessageRefs(messageRefs);
    });

    return () => {
      unsubscribe();

      console.log(messageRefs);
    };
  }, [channelId]);


  return (
    <div className='flex-1 flex flex-col bg-gray-500 text-white'>
      <div className='p-4 m-3 overflow-y-auto'>
        {messageRefs.map((messageRef) => (
          <MessageTile message={messageRef.message} key={messageRef.id} />
        ))}
      </div>
      <div className='mt-auto px-4 py-2 bottom-0 bg-gray-900'>
        <div className='flex items-center'>
          <TextareaAutosize
            placeholder='メッセージを入力'
            className='flex-1 bg-gray-700 text-white p-2 mx-2 rounded-lg focus:outline-none'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={message} />
          <button className='text-gray-400 hover:text-white' onClick={sendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}