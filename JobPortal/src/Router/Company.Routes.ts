import { Router } from "express";
import { createCompany, getCompanyDetails, updateCompanyInfo } from "../Controllers/Company.Controller";
import { checkAuthentication, checkAuthorization } from "../Middlewares/Auth";

const router = Router();

router.get("/:id", getCompanyDetails)
router.post('/', checkAuthentication, checkAuthorization('RECRUITER'), createCompany)
router.put('/:id', checkAuthentication, checkAuthorization('RECRUITER'), updateCompanyInfo)

export default router