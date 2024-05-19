import { useEffect } from "react"
import { login, logout } from "../user/userSlice"
import { auth } from "./Auth"
import { useDispatch } from "react-redux"

const useAuthState = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Firebase Authの認証状態の変更を監視するイベントリスナーを登録
        const unsubscribe = auth.onAuthStateChanged((loginUser) => {

            if (loginUser) {
                // ユーザーがログインしている場合、ユーザーIDをReduxストアに保存
                dispatch(login(loginUser.uid));
            } else {
                // ログアウトしている場合、ユーザーIDをReduxストアから削除
                dispatch(logout());
            }
        });
        
        // コンポーネントがアンマウントされた際にイベントリスナーを解除
        return () => unsubscribe();
    }, [dispatch]);

    return;
}

export default useAuthState