import { Router } from "express";
import { adminLogin } from "../controllers/adminController.js";
export let adminRouter = Router();


adminRouter.post('/signin',adminLogin)

