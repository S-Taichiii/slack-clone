import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseconfig";
import { Message, MessageRef } from "../../type/Message";

const db = getFirestore(firebaseApp);

export const subscribeMessage = (
  channelID: string,
  onMessagesUpdated: (messages: MessageRef[]) => void
) => {
  const q = query(
    collection(db, "messages"),
    where("channel_id", "==", channelID)
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const messageRefs: MessageRef[] = [];

      querySnapshot.forEach((doc) => {
        messageRefs.push({
          id: doc.id,
          message: doc.data() as Message,
        });
      });

      onMessagesUpdated(messageRefs);
    },
    (error) => {
      console.error("Failed to subscribe messages: ", error);
    }
  );
};

export const postMessage = async (message: Message) => {
  await addDoc(collection(db, "messages"), message);
};

export const createMessage = (
  userId: string,
  channelId: string,
  messageText: string
): Message => {
  const timestamp = Timestamp.fromDate(new Date());

  return {
    user_id: userId,
    channel_id: channelId,
    text: messageText,
    create_at: timestamp,
    is_edited: false,
    update_at: timestamp,
  };
};

export const deleteMessage = async (messageRef: MessageRef) => {
  await deleteDoc(doc(db, "messages", messageRef.id));
};

export const editMessage = async (messageRef: MessageRef, newText: string) => {
  const timestamp = Timestamp.fromDate(new Date());

  await updateDoc(doc(db, "messages", messageRef.id), {
    is_edited: true,
    text: newText,
    update_at: timestamp,
  });
};
