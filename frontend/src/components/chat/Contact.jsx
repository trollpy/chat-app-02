import { useState, useEffect } from "react";
import { getUser } from "../../services/ChatService";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
  const [contact, setContact] = useState();

  useEffect(() => {
    const contactId = chatRoom.members?.find(
      (member) =>
        typeof member === 'string'
          ? member !== currentUser.uid
          : member.uid !== currentUser.uid
    );

    const contactUid = typeof contactId === 'string' ? contactId : contactId?.uid;

    const fetchData = async () => {
      if (!contactUid) {
        console.warn('No contact UID found in chat room members');
        return;
      }

      try {
        const res = await getUser(contactUid);
        setContact(res);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    if (contactUid) {
      fetchData();
    }
  }, [chatRoom, currentUser]);

  return <UserLayout user={contact} onlineUsersId={onlineUsersId} />;
}
