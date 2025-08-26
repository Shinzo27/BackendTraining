import { Router } from "express";
import { getDepartments } from "../controllers/statics";

const router = Router();

router.get('/getDepartments', getDepartments)

export default router