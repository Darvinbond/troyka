"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BlogGridItem from "./components/blogGridItem";
import Button from "../components/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogListItem from "./components/blogListItem";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { blogProp } from "../GlobalRedux/reducers/blogReducers";

export default function Blog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isListView, setisListView] = useState(false);

  function searchItems(data: blogProp, searchQuery: string) {
    let normalizedSearchQuery = searchQuery.toLowerCase();

    let results = data.filter((item) => {
      let { title, content } = item;
      let normalizedTitle = title.toLowerCase();
      let normalizedContent = content.toLowerCase();

      return (
        normalizedTitle.includes(normalizedSearchQuery) ||
        normalizedContent.includes(normalizedSearchQuery)
      );
    });

    return results;
  }

  
  const blogData = useSelector((state: RootState) => state.blog);

  const collectrecipeBlogData = () => {
    const searchQuery = searchParams.get("searchQuery");

    const filteredBlogData = searchQuery
      ? searchItems(blogData, searchQuery)
      : blogData;

    return filteredBlogData;
  };

  const recipeBlogData = [...collectrecipeBlogData()].sort(
    (a: blogProp[0], b: blogProp[0]) => {
      const idA = a.id;
      const idB = b.id;

      return idB - idA;
    }
  );

  const pageBannerData =
    recipeBlogData.length > 0
      ? recipeBlogData.reduce((a, b) =>
          a.comments.length > b.comments.length ? a : b
        )
      : null;

  useEffect(() => {
    if (searchParams.get("viewtype")) {
      if (searchParams.get("viewtype") == "list") {
        setisListView(true);
      } else {
        setisListView(false);
      }
    } else {
      setisListView(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("viewtype", isListView ? "list" : "grid");
  }, [isListView]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="pt-[70px] flex flex-col gap-[50px]">
      <div className="flex flex-col justify-start w-full gap-[20px]">
        <span className="text-[35px] font-[700]">Blog</span>
      </div>
      {pageBannerData && (
        <div className="w-full h-[500px] bg-[#1d4e4b] overflow-hidden grid grid-cols-7 border rounded-[30px]">
          <div className="col-span-3 px-[50px] py-[50px] flex flex-col gap-[30px]">
            <span className="text-white text-[40px] font-[700]">
              {pageBannerData.title}
            </span>
            <span className="text-gray-300 font-[300]">
              {pageBannerData.content}
            </span>
            <span className="flex items-center gap-[10px] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-8 text-white bg-[#fc6719] rounded-full aspect-square p-[10px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              <a
                href={`/blog/${pageBannerData.id}`}
                className="cursor-pointer hover:underline leading-3"
              >
                Read full article
              </a>
            </span>
          </div>
          <div className="col-span-4 overflow-hidden">
            <Image
              alt="Salt Image"
              className="w-full h-full object-cover"
              src={pageBannerData.img_url}
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[50px]">
        <div className="flex items-start justify-end w-full">
          <div className="flex items-center bg-[#1d4e4b] w-max h-max p-[5px] border rounded-full justify-start -gap-[20px]">
            <Button
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("viewtype", "list")
                );
                setisListView(true);
              }}
              className={`${
                isListView && "!bg-white hover:!bg-white !text-[#2b6b67] z-30"
              } !bg-transparent hover:!bg-[#2b6b67] !gap-1 text-white !font-[300]`}
              text={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    />
                  </svg>
                  List
                </>
              }
            />
            <Button
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("viewtype", "grid")
                );
                setisListView(false);
              }}
              className={`${
                !isListView && "!bg-white hover:!bg-white !text-[#2b6b67] z-30"
              } !bg-transparent ml-[-10px] hover:!bg-[#2b6b67] !gap-1 text-white !font-[300]`}
              text={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                  </svg>
                  Grid
                </>
              }
            />
          </div>
        </div>
        {recipeBlogData && recipeBlogData.length > 0 ? (
          <div
            className={`grid ${
              isListView ? "" : "grid-cols-4"
            } auto-rows-min gap-y-[40px] gap-x-[20px]`}
          >
            {recipeBlogData.map((data) => (
              <>
                {isListView ? (
                  <BlogListItem {...data} />
                ) : (
                  <BlogGridItem {...data} />
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">No Data Found</div>
        )}
      </div>
    </div>
  );
}
