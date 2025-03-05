import express from "express"
import "dotenv/config"
import cors from "cors"
import { connectDb } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { userRouter } from "./router/userRouter.js";
import { productRouter } from "./router/productRoute.js";
import { adminRouter } from "./router/adminRoute.js";
import { cartRouter } from "./router/cartRoute.js";
import { orderRouter } from "./router/ordersRoute.js";
import  Razorpay from "razorpay"

let app = express();
let PORT = process.env.PORT || 4000

connectCloudinary();
// middlewares
app.use(express.json())
app.use(cors())

// api endpoint
app.get("/",(req,res)=>{
    res.json({
        message:'API  WORKING'
    })
})
app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use('/api/v1/admin',adminRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/cart",cartRouter)
async function main(){
    await connectDb()
    app.listen(PORT,()=>{
        console.log('listing on port ',PORT)
    })
}
main()