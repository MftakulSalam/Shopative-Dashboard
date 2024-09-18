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
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
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
  const [images, setImages] = useState<string[]>([]);

  //📄 SETUP FORM
  const { register, formState, handleSubmit, setValue } =
    useForm<ProductFormSchema>({
      resolver: zodResolver(productFormSchema),
    });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `/api/products?id=${query.id}`,
    fetcher
  );

  useEffect(() => {
    if (!query.id) return;
    if (data) {
      setImages(data.product.images);
      setValue("product_name", data.product.product_name);
      setValue("category", data.product.category);
      setValue("color", data.product.color);
      setValue("storage", data.product.storage);
      setValue("description", data.product.description);
      setValue("price", String(data.product.price));
    }
  }, [query.id, data]);

  const onSubmit = handleSubmit(async (value) => {
    setLoading(true);
    try {
      if (query.id) {
        const res = await axios.put("/api/products/", {
          ...value,
          images: [...images, ...imageLinks],
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
  //📄 SETUP FORM

  //📷 SETUP PRODUCT IMAGE
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  const uploadImages: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    const files = ev.target.files ? Array.from(ev.target.files) : [];
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
      console.log(res.data.links);
      const newImageLinks = [...imageLinks, res.data.links[0]];
      setImageLinks(newImageLinks);
    }
  };
  //📷 SETUP PRODUCT IMAGE

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <AppShell>
      <div className="py-5 px-10 ">
        <div>
          <h1 className="font-semibold font-urbanist text-2xl">
            Update product
          </h1>
        </div>
        {!isLoading ? (
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
                  <FileUpload
                    imagesLength={images.length}
                    onChange={uploadImages}
                  />
                </div>
              </div>
              <div className="basis-1/2 -mt-5 flex flex-col relative h-screen">
                {images.concat(imageLinks).length > 0 ? (
                  <div className="h-fit grid grid-cols-2 grid-rows-2 gap-4">
                    {images.concat(imageLinks).map((image, idx) => (
                      <div className="rounded-3xl h-72 bg-white" key={idx}>
                        <Image
                          className="object-contain h-72"
                          src={image}
                          alt="product-img-1"
                          width={500}
                          height={500}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h1 className="font-poppins text-3xl pb-16">
                      No image available
                    </h1>
                  </div>
                )}
                <div className="flex w-full gap-4 mt-7 font-urbanist">
                  <Link
                    href={"/products"}
                    className="p-[3px] relative basis-1/2"
                  >
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
        ) : (
          <div className="flex gap-8 animate-pulse mt-6">
            <div className="flex flex-col basis-1/2">
              <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
              <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
              <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
              <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
                  <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
                  <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
                </div>
              </div>
              <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
              <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
              <div className="w-48 h-6 rounded-full bg-gray-200 mt-4"></div>
              <div className="w-full h-12 rounded-xl bg-gray-200 mt-2"></div>
              <div className="w-full h-32 bg-gray-200 mt-4"></div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-4 h-fit basis-1/2">
              <div className="w-full h-72 bg-gray-200 rounded-3xl"></div>
              <div className="w-full h-72 bg-gray-200 rounded-3xl"></div>
              <div className="w-full h-72 bg-gray-200 rounded-3xl"></div>
              <div className="w-full h-72 bg-gray-200 rounded-3xl"></div>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="fixed z-50 opacity-50 inset-0 bg-black flex">
          <div role="status" className=" mx-auto my-auto">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </AppShell>
  );
}
