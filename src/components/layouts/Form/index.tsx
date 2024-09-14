// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'

// type FormLayoutProps = {
//     register: any;
//     onSubmit: (data: any) => void
// }

// export default function FormLayout(props: FormLayoutProps) {
//     const { register, onSubmit } = props;

//   return (
//     <form
//             className="max-w-md mt-10 font-poppins h-screen relative"
//             onSubmit={onSubmit}
//           >
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="text"
//                 id="product_name"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 {...register("product_name")}
//               />
//               <label
//                 htmlFor="product_name"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Product name
//               </label>
//               {formState.errors.product_name && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                   <span className="font-medium">Oops!</span>{" "}
//                   {formState.errors.product_name.message}!
//                 </p>
//               )}
//             </div>
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="text"
//                 id="category"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 {...register("category")}
//               />
//               <label
//                 htmlFor="category"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Category
//               </label>
//               {formState.errors.category && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                   <span className="font-medium">Oops!</span>{" "}
//                   {formState.errors.category.message}!
//                 </p>
//               )}
//             </div>
//             <div className="grid md:grid-cols-2 md:gap-6">
//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   type="text"
//                   id="color"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   {...register("color")}
//                 />
//                 <label
//                   htmlFor="color"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Color
//                 </label>
//                 {formState.errors.color && (
//                   <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                     <span className="font-medium">Oops!</span>{" "}
//                     {formState.errors.color.message}!
//                   </p>
//                 )}
//               </div>
//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   type="text"
//                   id="storage"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   {...register("storage")}
//                 />
//                 <label
//                   htmlFor="storage"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Storage
//                 </label>
//                 {formState.errors.storage && (
//                   <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                     <span className="font-medium">Oops!</span>{" "}
//                     {formState.errors.storage.message}!
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="text"
//                 id="description"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 {...register("description")}
//               />
//               <label
//                 htmlFor="description"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Description
//               </label>
//               {formState.errors.description && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                   <span className="font-medium">Oops!</span>{" "}
//                   {formState.errors.description.message}!
//                 </p>
//               )}
//             </div>
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="number"
//                 id="price"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 {...register("price")}
//               />
//               <label
//                 htmlFor="price"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Price
//               </label>
//               {formState.errors.price && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                   <span className="font-medium">Oops!</span>{" "}
//                   {formState.errors.price.message}!
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="p-[3px] absolute bottom-28 right-0"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-300 rounded-lg" />
//               <div className="px-8 py-2  bg-slate-100 rounded-[6px]  relative group transition duration-200 text-black font-semibold hover:bg-transparent">
//                 Add product
//               </div>
//             </button>
//           </form>
//   )
// }
