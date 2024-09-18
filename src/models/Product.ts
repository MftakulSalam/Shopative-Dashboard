import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  product_name: { type: String },
  category: { type: String },
  color: { type: String },
  storage: { type: String },
  description: { type: String },
  price: { type: Number },
  images: [{ type: String }],
});

export const Product = models.Product || model("Product", ProductSchema);
