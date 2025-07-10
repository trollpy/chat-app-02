import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { _id: false }
);

const chatRoomSchema = new mongoose.Schema(
  {
    members: {
      type: [memberSchema],
      required: true,
      validate: [v => v.length === 2, "Chat room must have exactly 2 members"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ChatRoom", chatRoomSchema);
