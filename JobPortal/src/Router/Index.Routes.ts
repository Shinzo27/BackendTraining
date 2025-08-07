import { Router } from "express";
import userRouter from '../Router/User.Route.js'
import companyRouter from '../Router/Company.Routes.js'
import jobRouter from '../Router/Job.Routes.js'
import applicationRouter from '../Router/Application.Routes.js'
import { checkAuthentication } from "../Middlewares/Auth.js";

const router = Router();

router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/job', checkAuthentication, jobRouter)
router.use('/applications', checkAuthentication, applicationRouter)

export default router;
