import mongoose, { Schema } from "mongoose";

let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  cartData:{type:Object,default:{}}

},{minimize:false });

export const userModel = mongoose.models.users || mongoose.model('users',userSchema)