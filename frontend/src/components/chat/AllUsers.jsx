import { useState, useEffect } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users = [],
  chatRooms = [],
  setChatRooms,
  onlineUsersId = [],
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  // Extract contact user IDs from chatRooms
  useEffect(() => {
    if (!Array.isArray(chatRooms) || !currentUser?.uid) return;

    const ids = chatRooms
      .map((room) => {
        const members = room.members || room.member || [];
        const other = members.find((m) => m.uid !== currentUser.uid);
        return other?.uid;
      })
      .filter(Boolean);

    console.log("Extracted contact IDs:", ids);
    setContactIds(ids);
  }, [chatRooms, currentUser?.uid]);

  // Filter out users who are already contacts or the current user
  useEffect(() => {
    if (!Array.isArray(users) || !currentUser?.uid) return;

    const filtered = users.filter(
      (user) =>
        user?.uid &&
        user.uid !== currentUser.uid &&
        !contactIds.includes(user.uid)
    );
    setNonContacts(filtered);
  }, [contactIds, users, currentUser?.uid]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    if (!user?.uid || !currentUser?.uid) return;

    const payload = {
      sender: {
        uid: currentUser.uid,
        username: currentUser.username || currentUser.displayName || "Anonymous",
        avatar: currentUser.avatar || currentUser.photoURL || "",
      },
      receiver: {
        uid: user.uid,
        username: user.username || user.displayName || "Anonymous",
        avatar: user.avatar || user.photoURL || "",
      },
    };

    try {
      console.log("Creating chat room with:", payload);

      const newRoom = await createChatRoom(payload);
      console.log("Chat room creation response:", newRoom);

      if (newRoom && newRoom._id) {
        setChatRooms((prev) => [...prev, newRoom]);
        changeChat(newRoom);
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  if (!currentUser?.uid) return <div>Loading...</div>;

  return (
    <ul className="overflow-auto h-[30rem]">
      <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
      <li>
        {chatRooms.map((chatRoom, index) => {
          const members = chatRoom.members || chatRoom.member;

          if (!Array.isArray(members) || members.length !== 2) return null;

          return (
            <div
              key={chatRoom._id}
              className={classNames(
                index === selectedChat
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                "flex items-center px-3 py-2 text-sm"
              )}
              onClick={() => changeCurrentChat(index, chatRoom)}
            >
              <Contact
                chatRoom={chatRoom}
                onlineUsersId={onlineUsersId}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      </li>

      <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Other Users</h2>
      <li>
        {nonContacts.map((user, index) => (
          <div
            key={user.uid || `user-${index}`}
            className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => handleNewChatRoom(user)}
          >
            <UserLayout user={user} onlineUsersId={onlineUsersId} />
          </div>
        ))}
      </li>
    </ul>
  );
}
