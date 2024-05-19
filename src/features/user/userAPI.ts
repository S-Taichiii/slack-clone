import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { User, UserRef } from "../../type/User";
import { firebaseApp } from "../../firebase/firebaseconfig";

const db = getFirestore(firebaseApp);

export const getUser = async (user_uid: string) => {
  const usersRef = doc(db, "user", user_uid);
  const docSnap = await getDoc(usersRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
};

export const postUser = async (userRef: UserRef) => {
  const user = userRef.user;

  await setDoc(doc(db, "user", userRef.uid), {
    displayName: user.displayName,
    email: user.email,
    profile_picture: user.profile_picture,
  });
};
