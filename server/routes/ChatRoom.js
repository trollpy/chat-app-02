import express from 'express';

import {
    createChatRoom,
    getChatRoomsOfUser,
    getChatRoomsOfUsers,
} from "../controllers/chatRoom.js";

const router = express.Router();

router.post("/", createChatRoom); 

// More specific route comes first!
router.get("/:firstUserId/:secondUserId", getChatRoomsOfUsers); 
router.get("/:userId", getChatRoomsOfUser); // This goes last

export default router;
