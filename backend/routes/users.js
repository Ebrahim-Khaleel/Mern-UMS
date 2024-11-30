import express from "express";
import { editProfile } from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router()

router.post("/:userId/editProfile", verifyToken, editProfile);

export default router;