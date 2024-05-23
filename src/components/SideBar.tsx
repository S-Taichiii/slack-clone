import React, { useEffect, useState } from 'react'
import { Home, ChatBubble } from "@mui/icons-material";
import { useAppSelector } from '../app/hooks';
import {User} from "../type/User";
import { getUser } from '../features/user/userAPI';
import { signOut } from '../features/auth/Auth';

function SideBar() {
    const userId = useAppSelector((state) => state.user.userId);
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const fetchUser = async() => {
            if (userId) {
                const userRef = await getUser(userId);
                
                if (userRef) {
                    setUser(userRef);
                }
            }
        }

        fetchUser();
    }, [userId])

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
                {/* プロフィール画像をクリックするだけでログアウト処理を行う */}
                <img src={user?.profile_picture || './default-user-icon.png'} alt='' onClick={signOut} />
            </div>
            <span className='text-xs'>{user?.displayName}</span>
        </div>
    </div>

  )
}

export default SideBar