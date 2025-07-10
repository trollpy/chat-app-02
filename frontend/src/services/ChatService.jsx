import axios from "axios";
import auth from "../config/firebase";
import { io } from "socket.io-client";

const baseURL = "http://localhost:5000/api";

// Store socket instance to prevent multiple connections
let socketInstance = null;

const getUserToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  const token = await user.getIdToken();
  return token;
};

export const initiateSocketConnection = async () => {
  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
  }

  const token = await getUserToken();
  socketInstance = io("http://localhost:5000", {
    auth: {
      token,
    },
  });

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export const getSocketInstance = () => {
  return socketInstance;
};

const createHeader = async () => {
  const token = await getUserToken();
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeRequestWithRetry = async (requestFn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      await delay(1000 * Math.pow(2, i));
    }
  }
};

// === USERS ===

export const getAllUsers = async () => {
  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(`${baseURL}/user`, header);
    return res.data;
  });
};

export const getUser = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(`${baseURL}/user/${userId}`, header);
    return res.data;
  });
};

export const getUsers = async (users) => {
  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(`${baseURL}/user/users`, {
      ...header,
      params: users,
    });
    return res.data;
  });
};

// === CHAT ROOMS ===

export const getChatRooms = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(`${baseURL}/room/${userId}`, header);
    return res.data;
  });
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  if (!firstUserId || !secondUserId)
    throw new Error("Both user IDs are required");

  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(
      `${baseURL}/room/${firstUserId}/${secondUserId}`,
      header
    );
    return res.data;
  });
};

export const createChatRoom = async ({ sender, receiver }) => {
  if (!sender?.uid || !receiver?.uid) {
    throw new Error("Sender and receiver objects with `uid` are required");
  }

  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.post(`${baseURL}/room`, { sender, receiver }, header);
    return res.data;
  });
};

// === MESSAGES ===

export const getMessagesOfChatRoom = async (chatRoomId) => {
  if (!chatRoomId) throw new Error("Chat room ID is required");

  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.get(`${baseURL}/message/${chatRoomId}`, header);
    return res.data;
  });
};

export const sendMessage = async (messageBody) => {
  if (!messageBody) throw new Error("Message body is required");

  return makeRequestWithRetry(async () => {
    const header = await createHeader();
    const res = await axios.post(`${baseURL}/message`, messageBody, header);
    return res.data;
  });
};
