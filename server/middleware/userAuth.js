

import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'

export const userAuth = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message:'Please login'
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({_id:decoded.id})
        if(!user){
            return res.status(401).json({
                message:'Please login'
            })
        }
        req.body.userId = user._id
        next()
    }catch(err){
        return res.status(401).json({
            message:err.message
        })
    }
}   