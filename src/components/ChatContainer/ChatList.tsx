import React, { useEffect, useState } from 'react'
import { ChannelRef } from '../../type/Channel'
import { subscribeChannels } from '../../features/channel/channelAPI'
import ChannelCell from './ChannelCell';
import ChannelAddModal from './ChannelAddModal';

function ChatList() {
    const [channelRefs, setChannelRefs] = useState<ChannelRef[]>([])
    const [showModal, setShowModal] = useState<boolean>(false);
    
    useEffect(() => {
        const unsubscribe = subscribeChannels(((channelRefs: ChannelRef[]) => {
            setChannelRefs(channelRefs);
        }));
        
        return () => unsubscribe();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

  return (
    <div className='w-64 bg-gray-800'>
        <div className="py-4 px-2 border-b border-gray-300">
            <span className='font-bold text-gray-300'>チャンネル</span>
        </div>
        <div className='overflow-y-auto'>
            {
                channelRefs.map(({ channel, id }) => (
                    <ChannelCell channel={channel} id={id} key={id} /> 
                ))
            }
        </div>
        <div className='px-4 py-2'>
            <button className='text-gray-300 hover:text-white' onClick={handleOpenModal}>＋チャンネルを追加</button>
            {
                showModal && <ChannelAddModal handleCloseModal={handleCloseModal} />
            }
        </div>
    </div>
  )
}

export default ChatList