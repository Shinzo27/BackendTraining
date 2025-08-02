import { Router } from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../Controllers/User.Controller.js";

const router = Router()

router.get("/getUsers", getUsers);

router.post("/addUser", addUser);

router.put("/updateUser/:id", updateUser);

router.delete('/deleteUser/:id', deleteUser)

export default router