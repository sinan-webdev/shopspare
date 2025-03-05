import { Router } from 'express';
import { addToCart, updateCart, getUserCart, removeItem } from '../controllers/cartController.js';
import { userAuth } from '../middleware/userAuth.js';

export const cartRouter = Router();


cartRouter.post('/addtocart',userAuth,addToCart)
cartRouter.post('/updatecart',userAuth,updateCart)
cartRouter.get('/getusercart',userAuth,getUserCart)
cartRouter.post("/removeitem",userAuth,removeItem)