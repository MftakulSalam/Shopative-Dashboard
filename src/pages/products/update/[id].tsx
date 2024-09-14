/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppShell from "@/components/layouts/AppShell";
import { FileUpload } from "@/components/ui/file-upload";
import { ProductType } from "@/types/ProductType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productFormSchema = z.object({
  product_name: z.string(),
  category: z.string(),
  color: z.string(),
  storage: z.string(),
  description: z.string(),
  price: z.string(),
});

type ProductFormSchema = z.infer<typeof productFormSchema>;

export default function UpdatePage() {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>({
    product_name: "",
    category: "",
    color: "",
    storage: "",
    description: "",
    price: 0,
  });

  const { register, formState, handleSubmit, setValue } =
    useForm<ProductFormSchema>({
      resolver: zodResolver(productFormSchema),
    });

  useEffect(() => {
    if (!query.id) return;
    axios.get(`/api/products?id=${query.id}`).then((res) => {
      setProduct(res.data.product);
      setValue("product_name", res.data.product.product_name);
      setValue("category", res.data.product.category);
      setValue("color", res.data.product.color);
      setValue("storage", res.data.product.storage);
      setValue("description", res.data.product.description);
      setValue("price", String(res.data.product.price));
    });
  }, [query.id]);

  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const onSubmit = handleSubmit(async (value) => {
    try {
      setLoading(true);
      if (query.id) {
        // alert(JSON.stringify({ ...value, files, _id: query.id }, null, 2));
        const res = await axios.put("/api/products/", {
          ...value,
          // files,
          _id: query.id,
        });
        if (res.status === 200) {
          setLoading(false);
          push("/products");
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  });

  const uploadImages: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    console.log("JANCOK");
    const files = ev.target.files ? Array.from(ev.target.files) : []; // Ubah FileList menjadi array
    if (files?.length > 0) {
      const data = new FormData();
      if (files) {
        for (const file of files) {
          data.append("files", file);
        }
      }
      const res = await axios("/api/upload", {
        method: "POST",
        data,
      });
      if (res.status === 200) {
        setLoading(false);
        push("/products");
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <AppShell>
      <div className="py-5 px-10 ">
        <div>
          <h1 className="font-semibold font-urbanist text-2xl">
            Update product
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className=" flex gap-8">
            <div className="basis-1/2 mt-10 font-poppins relative ">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="product_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("product_name")}
                />
                <label
                  htmlFor="product_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Product name
                </label>
                {formState.errors.product_name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {formState.errors.product_name.message}!
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="category"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("category")}
                />
                <label
                  htmlFor="category"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category
                </label>
                {formState.errors.category && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {formState.errors.category.message}!
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="color"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("color")}
                  />
                  <label
                    htmlFor="color"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Color
                  </label>
                  {formState.errors.color && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span>{" "}
                      {formState.errors.color.message}!
                    </p>
                  )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="storage"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("storage")}
                  />
                  <label
                    htmlFor="storage"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Storage
                  </label>
                  {formState.errors.storage && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span>{" "}
                      {formState.errors.storage.message}!
                    </p>
                  )}
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("description")}
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
                {formState.errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {formState.errors.description.message}!
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("price")}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
                {formState.errors.price && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {formState.errors.price.message}!
                  </p>
                )}
              </div>
              <div className="w-full mb-5 group">
                <FileUpload onChange={uploadImages} />
              </div>
            </div>
            <div className="basis-1/2 -mt-5 flex flex-col relative">
              {true ? (
                <div className="h-fit grid grid-cols-2 grid-rows-2 gap-4">
                  <div className="rounded-3xl h-72 bg-white">
                    <Image
                      className="object-contain h-72"
                      src={
                        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large_2x.jpg"
                      }
                      alt="product-img-1"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="rounded-3xl h-72 bg-white">
                    <Image
                      className="object-contain h-72"
                      src={
                        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large_2x.jpg"
                      }
                      alt="product-img-1"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="rounded-3xl h-72 bg-white">
                    <Image
                      className="object-contain h-72"
                      src={
                        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large_2x.jpg"
                      }
                      alt="product-img-1"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="rounded-3xl h-72 bg-white">
                    <Image
                      className="object-contain h-72"
                      src={
                        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large_2x.jpg"
                      }
                      alt="product-img-1"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="font-poppins text-3xl pb-16">
                    No image available
                  </h1>
                </div>
              )}
              <div className="flex w-full gap-4 mt-7 font-urbanist">
                <Link href={"/products"} className="p-[3px] relative basis-1/2">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-300 rounded-lg" />
                  <div className="px-8 py-2  bg-slate-100 rounded-[6px] text-center relative group transition duration-200 text-black font-semibold hover:bg-transparent">
                    Back
                  </div>
                </Link>
                <button type="submit" className="p-[3px] relative basis-1/2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-300 rounded-lg" />
                  <div className="px-8 py-2  bg-slate-100 rounded-[6px]  relative group transition duration-200 text-black font-semibold hover:bg-transparent">
                    Update product
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
