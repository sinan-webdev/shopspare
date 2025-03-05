import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
export const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
      let response = await userModel.findOne(
        {
          email
        }
      );
      if (!response) {
        return res.json({
          success: false,
          message: "user not found sign up",
        });
      }
      let comparePassword = await bcrypt.compare(password,response.password)
        if(comparePassword){
          let token = jwt.sign({"id":response._id},process.env.JWT_SECRET)
        res.json({
            success:true,
            message:token
        })
        }
    } catch (error) {
      res.json({
        success:false,
        message:'invalid creadential'
      })
    }
  };
  

  export const userRegister = async(req,res)=>{
    let {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            return res.json({
                success:false,
                message:'missing data'
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:'Please enter a valid email'
            })
        }
        let searchData = await userModel.findOne({email})
        console.log(searchData)
        if(searchData){
            return res.json({
                success:false,
                message:'user already exist sign in'
            })
        }
        let hashPassword = await bcrypt.hash(password,3)
        let response = await userModel.create({
            name,
            email,
            password:hashPassword
        })
        if(response){
            let token = jwt.sign({"id":response._id},process.env.JWT_SECRET)
            res.json({
                success:true,
                message:token
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
  }