"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as yup from "yup";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const validationSchema = yup.object().shape({
    searchQuery: yup.string().required(),
  });

  const searchParams = useSearchParams();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    router.push(`/blog?searchQuery=${watch("searchQuery")}`);
  }, [watch("searchQuery")]);

  const onSubmit = (data: any) => {
    router.push(`/blog?searchQuery=${data.searchQuery}`);
    //   // reset();
  };

  return (
    <nav className="backdrop-blur-sm fixed z-[1000] h-[70px] px-[30px] items-center flex justify-between w-full">
      <div className="text-[#fc6719] font-[700] text-[40px]">
        <span className="text-[#1d4e4b]">C</span>
        ook
        <span className="text-[#1d4e4b]">B</span>
        ook
      </div>
      <div className="h-max flex justify-end">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden border transition-all duration-300 p-[7px] focus-within:w-[400px] w-[400px] h-[50px] rounded-full flex justify-between items-center  flex-row backdrop-blur-sm bg-opacity-20 bg-white  gap-[10px]"
        >
          <input
            {...register("searchQuery")}
            placeholder="Search a recipe ..."
            className="placeholder:text-[#1d4e4b99] text-[#1d4e4b] backdrop-blur-sm bg-opacity-20 bg-[#1d4e4b2d] w-full focus:w-full h-full outline-none rounded-full px-[20px] text-sm"
          />
          <button
            onClick={() =>
              searchParams.get("searchQuery") && setValue("searchQuery", "")
            }
            className="h-full p-[5px] bg-[#1d4e4b] aspect-square rounded-full cursor-pointer"
          >
            {!searchParams.get("searchQuery") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="h-full p-1 text-white w-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-full p-1 text-white w-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
