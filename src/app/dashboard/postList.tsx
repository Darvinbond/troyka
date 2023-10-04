import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addBlog,
  blogProp,
  deleteBlog,
} from "../../GlobalRedux/reducers/blogReducers";
import { format } from "date-fns";
import { RootState } from "../../GlobalRedux/store";
import Image from "next/image";
import Popup from "../components/popup";
import dynamic from "next/dynamic";
// import CreateEditPost from "../components/createEditPost";

function PostList() {
  const collectrecipeBlogData = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch();
  
  const CreateEditPost = dynamic(() => import("../components/createEditPost"), {
    ssr: false,
  });

  const recipeBlogData = [...collectrecipeBlogData].sort(
    (a: blogProp[0], b: blogProp[0]) => {
      // Assuming 'id' is a string representing a number
      const idA = a.id;
      const idB = b.id;

      // Sort in descending order (new to old)
      return idB - idA;
    }
  );

  function stripHTMLTags(html: string) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  return (
    <div className="flex flex-col h-full gap-[20px]">
      <div className="flex flex-col justify-start w-full gap-[20px] sticky top-0">
        <span className="text-[35px] font-[700]">Blog list</span>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg scrollbar-hide max-h-full">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                cover image
              </th>
              <th scope="col" className="px-6 py-3">
                Blog title
              </th>
              <th scope="col" className="px-6 py-3">
                date
              </th>
              <th scope="col" className="px-6 py-3">
                tags
              </th>
              <th scope="col" className="px-6 py-3">
                content
              </th>
              <th scope="col" className="px-6 py-3">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recipeBlogData.map((blog, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className=" aspect-video rounded-[8px] h-[60px] block overflow-hidden">
                    <Image
                      alt={blog.title}
                      src={blog.img_url}
                      width={100}
                      className="w-full h-full object-cover"
                      height={100}
                      loading="lazy"
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {blog.title}
                </th>
                <td className="px-6 py-4 text-xs">
                  {blog.date ? blog.date : "-"}
                </td>
                <td className="px-6 py-4 ">
                  <div className="flex flex items-center h-full gap-[5px] max-w-[300px] scrollbar-hide  overflow-x-auto w-ful justify-start">
                    {blog.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex border-2 items-center border-[#fc6719] bg-[#fc68195e] font-[600] w-max px-[10px] py-[2px] rounded-[8px] justify-between gap-[10px] text-black text-[10px]"
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td scope="row" className="px-6 py-4">
                  <div className="h-[100px] w-full text-ellipsis overflow-hidden">
                    {stripHTMLTags(blog.content)}
                  </div>
                </td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <Popup
                    clickElement={
                      <span className="font-medium text-blue-600 hover:underline">
                        Edit
                      </span>
                    }
                  >
                    <CreateEditPost data={blog} is_create={false} />
                  </Popup>
                  <span
                    onClick={() => {
                      dispatch(deleteBlog(blog.id));
                    }}
                    className="font-medium cursor-pointer text-red-600 hover:underline"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostList;
