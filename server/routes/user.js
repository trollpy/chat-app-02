import express from "express";
import { getAllUsers, getUser } from "../controllers/user.js"; // ✅ Corrected import

const router = express.Router();

// Route to get all users
router.get("/", getAllUsers);

// Route to get a specific user by ID
router.get("/:userId", getUser);

export default router;
