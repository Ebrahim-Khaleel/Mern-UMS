import express from "express"
import { addUser, login } from "../controllers/admin.js";
import { getAllUsers, editUser, deleteUser, getUserData } from "../controllers/admin.js"
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router()

router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:userId", verifyToken, deleteUser)
router.get("/getUserData/:userId", verifyToken, getUserData)
router.post("/editUser/:userId", verifyToken, editUser)
router.post("/addUser", verifyToken, addUser)

export default router;