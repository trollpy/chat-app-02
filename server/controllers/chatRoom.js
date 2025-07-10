import ChatRoom from "../models/ChatRoom.js";

export const createChatRoom = async (req, res) => {
  const { sender, receiver } = req.body;
  // Both should be: { uid, username, avatar }

  if (!sender?.uid || !receiver?.uid) {
    return res.status(400).json({ message: "Missing sender or receiver UID" });
  }

  try {
    // Check if chat room already exists between the two users
    const existingRoom = await ChatRoom.findOne({
      "members.uid": { $all: [sender.uid, receiver.uid] },
    });

    if (existingRoom) {
      return res.status(200).json(existingRoom);
    }

    const newRoom = await ChatRoom.create({
      members: [sender, receiver],
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error("createChatRoom error:", error);
    res.status(500).json({ message: error.message || "Failed to create chat room" });
  }
};

export const getChatRoomsOfUser = async (req, res) => {
  const { userId } = req.params; // Firebase UID

  try {
    const chatRooms = await ChatRoom.find({
      "members.uid": userId,
    });

    res.status(200).json(chatRooms);
  } catch (error) {
    console.error("getChatRoomsOfUser error:", error);
    res.status(500).json({ message: error.message || "Failed to retrieve chat rooms" });
  }
};

export const getChatRoomsOfUsers = async (req, res) => {
  const { firstUserId, secondUserId } = req.params;

  try {
    const chatRoom = await ChatRoom.findOne({
      "members.uid": { $all: [firstUserId, secondUserId] },
    });

    res.status(200).json(chatRoom);
  } catch (error) {
    console.error("getChatRoomsOfUsers error:", error);
    res.status(500).json({ message: error.message || "Failed to retrieve chat room" });
  }
};
