import {Router} from 'express'
import {  loginUser, userRegister } from '../controllers/userController.js'

export let userRouter = Router()


userRouter.post('/login',loginUser)
userRouter.post("/register",userRegister)

