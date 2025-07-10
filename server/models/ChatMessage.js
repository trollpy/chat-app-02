import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    chatRoomId: String,
    sender: String,
    message: String,
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

export default ChatMessage;
