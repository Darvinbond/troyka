"use client";

import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "./button";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addBlog, updateBlog } from "../GlobalRedux/reducers/blogReducers";
import { format } from "date-fns";

type PostData = {
  title: string;
  content: string;
  img_url: string;
  data?: string;
  tags: string[];
};

type EditPostData = {
  id: number;
  title: string;
  content: string;
  img_url: string;
  data?: string;
  tags: string[];
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Blog title is required"),
  content: yup.string().required("Blog content is required"),
  img_url: yup.string().required("Image URL is required"),
  tags: yup.array().min(1, "At least one tag is required").of(yup.string()),
});

type CreateEditProps = {
  data?: EditPostData;
  is_create: boolean;
};

function CreateEditPost({ data, is_create }: CreateEditProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      content: "",
      img_url: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (data && is_create == false) {
      setValue("content", data.content);
      setValue("img_url", data.img_url);
      setValue("content", data.content);
      setValue("tags", data.tags);
      setValue("title", data.title);
    }
  }, []);

  const onSubmit: SubmitHandler<PostData> = (data) => {
    const today = new Date();

    const formattedDate = format(today, "MMMM d, yyyy");

    dispatch(addBlog({ ...data, date: formattedDate }));

    reset();
  };

  const onEditSubmit: SubmitHandler<PostData> = (Editdata) => {
    setloading(true);

    const today = new Date();

    const formattedDate = format(today, "MMMM d, yyyy");

    console.log({
      id: data?.id,
      blogEdit: { ...Editdata, date: formattedDate },
    });

    dispatch(
      updateBlog({
        id: data?.id,
        blogEdit: { ...Editdata, date: formattedDate },
      })
    );

    setTimeout(() => {
      setloading(false);
      alert("Updated");
    }, 2000);

    // reset();
  };

  const [taginputValue, settagInputValue] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    settagInputValue(e.target.value);
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setValue("tags", [...watch("tags"), taginputValue]);
      console.log(...watch("tags"), taginputValue);
      settagInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setValue(
      "tags",
      watch("tags").filter((tag, indx) => indx != index)
    );
  };

  return (
    <form onSubmit={handleSubmit(is_create ? onSubmit : onEditSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex flex-col justify-start w-full gap-[20px]">
            <span className="text-[35px] font-[700]">
              {is_create ? "Create a " : "Edit "}Post
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title")}
                  id="username"
                  autoComplete="username"
                  className="block flex-1 bg-white rounded-[8px] outline-none w-full bg-transparent py-1.5 pl-[20px] text-gray-900 border placeholder:text-gray-400 focus:ring-[#fc6719] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder="How carefully dice your ..."
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CKEditor
                      //   onChange={(value, _) => setValue("content", value)}s
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        field.onChange(data);
                      }}
                      editor={ClassicEditor}
                    />
                  )}
                />
              </div>

              {errors.content ? (
                <span className="text-xs text-red-500">
                  {errors.content.message}
                </span>
              ) : (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              )}
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image url
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#fc6719] sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    {...register("img_url")}
                    id="username"
                    autoComplete="username"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="image.example.com/example.png"
                  />
                </div>
                {errors.img_url && (
                  <span className="text-xs text-red-500">
                    {errors.img_url.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={taginputValue}
                  autoComplete="username"
                  className="block flex-1 bg-white rounded-[8px] outline-none w-full bg-transparent py-1.5 pl-[20px] text-gray-900 border placeholder:text-gray-400 focus:ring-[#fc6719] focus:ring-1 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKey}
                  placeholder="Click enter to add tag"
                />
                <div className="flex justify-start items-center gap-[10px] mt-2">
                  {[...watch("tags")].map((tag, index) => (
                    <div className="flex border-2 items-center border-[#fc6719] bg-[#fc68195e] font-[600] text-[12px] w-max px-[10px] py-[5px] rounded-[8px] justify-between gap-[10px] text-black">
                      <span>{tag}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeTag(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {errors.tags && (
                  <span className="text-xs text-red-500">
                    {errors.tags.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {is_create && (
          <Button
            text="Cancel"
            onClick={(e) => e.preventDefault()}
            className="bg-gray-100"
          />
        )}
        <Button
          text={
            loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Submit"
            )
          }
          className="!bg-[#1d4e4b] text-white"
        />
      </div>
    </form>
  );
}

export default CreateEditPost;
