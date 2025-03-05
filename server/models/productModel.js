import mongoose, { Schema } from "mongoose";

let productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  date: { type: Date, required: true },
  bestseller: { type: Boolean },
});

export const productModel = mongoose.models.products || mongoose.model('products',productSchema)