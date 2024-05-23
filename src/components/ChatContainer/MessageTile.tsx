import { useEffect, useState } from "react";
import { Message, MessageRef } from "../../type/Message";
import { User } from "../../type/User";
import { getUser } from "../../features/user/userAPI";
import DeleteIcon from '@mui/icons-material/Delete';

interface MessageTileProps {
    messageRef: MessageRef;
    onButtonClick: (messageRef: MessageRef) => void;
}


const MessageTile: React.FC<MessageTileProps> = ({ messageRef, onButtonClick}) => {
    const [owner, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try  {
                const ownerData = await getUser(messageRef.message.user_id);
                if (ownerData) {
                    setUser(ownerData);
                }
            } catch (error) {
                setUser(null);
            }
        };
        
        fetchUser();
    }, []);

  return (
        <div className='bg-gray-700 p-3 m-3 rounded-lg flex justify-between'>
            <div>
                <div className='flex items-center mb-2'>
                    <img 
                        className='w-10 h-10 rounded-full mr-3' 
                        src= {owner?.profile_picture || './default-user-icon.png' } 
                        alt='プロフィール画像'
                    />
                    <div>
                        <div className='text-sm font-semibold text-white'>{owner?.displayName || "unknown"}</div>
                        <div className='text-xs text-gray-400'>{messageRef.message.create_at.toDate().toLocaleString()}</div>
                    </div>
                </div>
                <p className='text-gray-300'>{messageRef.message.text}</p>
            </div>
            <div className="flex items-center justify-center">
                <button className="w-10 h-10 p-2 hover:bg-gray-600 rounded-full" onClick={() => onButtonClick(messageRef)}>
                    <DeleteIcon  />
                </button>
            </div>
        </div> 
  )
}

export default MessageTile