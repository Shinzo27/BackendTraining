import { Router } from "express";
import { createRole, getRoles } from "../controllers/role";

const router = Router();

router.get("/", getRoles);
router.post("/", createRole);

export default router;
