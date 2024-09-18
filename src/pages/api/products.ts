// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { ProductType } from "@/types/ProductType";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query?.id) {
      try {
        await mongooseConnect();
        const product = await Product.findById(req.query.id);
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: "Fetch product by ID",
          product,
        });
      } catch (error) {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: "Get product failed",
        });
      }
    }
    try {
      await mongooseConnect();
      const products = await Product.find();
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Fetch all products",
        products,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: "Get products failed",
      });
    }
  } else if (req.method === "POST") {
    try {
      await mongooseConnect();
      const data: ProductType = req.body;
      const postProductResponse = await Product.create(data);
      res.status(201).json({
        statusCode: 200,
        status: true,
        message: "Product created successfully",
        postProductResponse,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: "Post product failed",
      });
    }
  } else if (req.method === "PUT") {
    try {
      await mongooseConnect();
      const {
        product_name,
        category,
        price,
        color,
        storage,
        description,
        _id,
        images
      } = req.body;

      const updateProductResponse = await Product.updateOne(
        { _id },
        { product_name, category, price, color, storage, description, images }
      );
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Product updated successfully",
        new_data: req.body,
        images: typeof images,
        updateProductResponse,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: "Update product failed",
      });
    }
  } else if (req.method === "DELETE" && req.query?.id) {
    try {
      await mongooseConnect();
      const deleteProductDelete = await Product.deleteOne({
        _id: req.query.id,
      });
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Product deleted successfully",
        deleteProductDelete,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: "Delete product failed",
      });
    }
  } else {
    res.status(405).json({
      statusCode: 405,
      status: false,
      message: "Method Not Allowed",
    });
  }
}
