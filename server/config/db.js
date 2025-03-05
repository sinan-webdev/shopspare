import mongoose from "mongoose";
export async function connectDb() {
    mongoose.connection.on('connected',()=>{
        console.log('connected');
    })
    await mongoose.connect(`${process.env.DATABASE_URI}flipkart`)
} 