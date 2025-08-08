import { Router } from "express";
import { createRole, getRoles } from "../Controllers/Role.Controller";

const router = Router();

router.get('/', getRoles)
router.post('/', createRole)

export default router;
