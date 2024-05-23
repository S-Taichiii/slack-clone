import React, { ChangeEvent, useState } from 'react'
import { editMessage } from '../../features/message/messageAPI';
import { MessageRef } from '../../type/Message';

interface Props {
    messageRef: MessageRef;
    handleCloseModal: () => void;
}

const MessageEditModal = ({ messageRef, handleCloseModal }: Props) => {
    const [newMessage, setNewMessage] = useState<string>('');

    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    }

    const handleMessageEdit = async () => {
        try {
            await editMessage(messageRef, newMessage);
            setNewMessage('');
            handleCloseModal();
        } catch (error) {
            console.error("Error editing message: ", error);
        }
    }

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    
  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
        onClick={handleCloseModal}
    >
        <div
            className="bg-gray-700 rounded-lg shadow-xl w-1/2"
            onClick={handleModalClick}
        >
            <div className="border-b px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg">メッセージを編集する</h3>
                <button
                    className="text-black close-modal"
                    onClick={handleCloseModal}
                >&times;</button>
            </div>
            <div className="p-4">
                <input type="text"
                        className="border rounded w-full py-2 px-3 text-grey-darkest text-black"
                        placeholder="名前"
                        onChange={handleMessageChange}
                />
            </div>
            <div className="flex justify-end items-center w-100 border-t p-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleMessageEdit}
                >変更</button>
            </div>
        </div>
    </div>
  )
}

export default MessageEditModal