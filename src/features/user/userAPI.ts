import { doc, getDoc, getFirestore } from "firebase/firestore";
import { User } from "../../type/User";
import { firebaseApp } from "../../firebase/firebaseconfig";

const db = getFirestore(firebaseApp);

export const getUser = async (user_uid: string) => {
  const usersRef = doc(db, "user", user_uid);
  const docSnap = await getDoc(usersRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
};
