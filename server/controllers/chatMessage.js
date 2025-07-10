import ChatMessage from "../models/ChatMessage.js";

// @desc    Create a new chat message
// @route   POST /api/message/
// @access  Protected
export const createMessage = async (req, res) => {
  try {
    const newMessage = new ChatMessage(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @desc    Get messages by chat room ID
// @route   GET /api/message/:chatRoomId
// @access  Protected
export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
