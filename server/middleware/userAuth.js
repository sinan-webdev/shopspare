

import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'

export const userAuth = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(401).json({
            message:'No token provided'
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({_id:decoded.id})
        if(!user){
            return res.status(401).json({
                message:'Invalid token'
            })
        }
        req.body.userId = user._id
        next()
    }catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }
}   