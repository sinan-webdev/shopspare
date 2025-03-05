import Razorpay from "razorpay";
import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
let currency = 'inr'
let delivery_fee = 10
// payment gayway initialize
const razorpayinstance  = new Razorpay({
    key_id:process.env.razorpay_key_id,
    key_secret:process.env.razorpay_key_secret
})

// cod payment method
export async function placeOrderCod(req, res) {
    try {
        let { userId, items, amount, address } = req.body;
        const orderData = {
            userId, items, amount, address, paymentMethod: 'COD', payment: false, date: Date.now()
        }
        let response = await orderModel.create(orderData)

        // to clear cart data
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({
            success: true,
            message: "order placed successful"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// stripe payment method
export async function placeOrderStripe(req, res) {

}
// razorpay payment method
export async function placeOrderRazorpay(req, res) {
    try {
        const {userId,items,amount,address} = req.body
        let orderData = {
            userId,items,address,amount,paymentMethod:"Razorpay",payment:false,date:Date.now()
        }
        let response = await orderModel.create(orderData)
        const options = {
            amount:amount* 100,
            currency:currency.toUpperCase(),
            receipt:response._id.toString()
        }
        await razorpayinstance.orders.create(options,(error,order)=>{
            if(error){
                return res.json({success:false,message:error})      
            }
            res.json({success:true,order})
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
// verify razorpay payment
export const verifyRazorpay = async(req,res)=>{
try {
    const {userId,razorpay_order_id} = req.body
    let orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
        await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({
            success:true,
            message:'payment successfull'
        })
    }
} catch (error) {
    
}
}
// all orders data for admin panel
export async function allOrders(req, res) {
    try {
        let orders = await orderModel.find({})
        
        if (orders) {
            res.json({
                success: true,
                message: orders
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// all orders data for frontend
export async function userOrders(req, res) {
    try {
        let { userId } = req.body
        let response = await orderModel.find({ userId })
        if (response) {
            res.json({
                success: true,
                message: response
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// update orders status

export async function updateStatus(req, res) {
    try {
        let { orderId,status } = req.body
        
        let response = await orderModel.findByIdAndUpdate(orderId,{status})
        
        if (response) {
            res.json({
                success: true,
                message: 'status updated'
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}