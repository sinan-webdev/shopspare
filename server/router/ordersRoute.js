import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import { allOrders, placeOrderCod, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay } from "../controllers/orderController.js";
import { adminMiddleware } from "../middleware/adminAuth.js";

export let orderRouter = Router();

orderRouter.post("/cod",userAuth,placeOrderCod)
orderRouter.post("/stripe",userAuth,placeOrderStripe)
orderRouter.post("/razorpay",userAuth,placeOrderRazorpay)
orderRouter.get("/user-orders",userAuth,userOrders)
orderRouter.post("/verifyrazorpay",userAuth,verifyRazorpay)
// routes for admin
orderRouter.get("/allorders",adminMiddleware,allOrders)
orderRouter.post("/updatestatus",adminMiddleware,updateStatus)