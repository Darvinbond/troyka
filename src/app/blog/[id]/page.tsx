"use client";

import { blogProp, commentBlog } from "@/app/GlobalRedux/reducers/blogReducers";
import { RootState } from "@/app/GlobalRedux/store";
import Button from "@/app/components/button";
import Popup from "@/app/components/popup";
import { yupResolver } from "@hookform/resolvers/yup";
import DOMPurify from "dompurify";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

type Props = {};

export default function BlogPreviewPage({}: Props) {
  const id = usePathname().split("/")[2];

  const [BlogData, setBlogData] = useState<{
    id: number;
    title: string;
    date: string;
    tags: string[];
    content: string;
    img_url: string;
    comments: string[];
  }>();
  const [doneLoading, setdoneLoading] = useState(false);
  const [is_open, setis_open] = useState();
  const [comments, setcomments] = useState<string[]>([]);
  const [commentLoading, setcommentLoading] = useState(false);

  const collectrecipeBlogData = useSelector((state: RootState) => state.blog);

  function renderHTML(html: string) {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  }

  const getBlogByID = (id: string) => {
    let query = collectrecipeBlogData.find((blog) => blog.id == parseInt(id));
    setdoneLoading(true);
    console.log(query);
    return query;
  };

  useEffect(() => {
    if (id && getBlogByID(id)) {
      setBlogData(getBlogByID(id));
      setcomments(getBlogByID(id)!.comments);
    }
  }, [id]);

  const validationSchema = yup.object().shape({
    comment: yup.string().required("Your comment is required"),
    id: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      comment: "",
      id: parseInt(id),
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(commentBlog(data));
    let old_comment = comments;
    old_comment.push(data.comment);
    setcomments(old_comment);
    reset();
  };

  // console.log(BlogData!.comments.reverse());

  return (
    <>
      {doneLoading &&
        (BlogData ? (
          <div className="pt-[100px] flex flex-col items-center gap-[20px]">
            <div className="flex flex-col justify-start w-full gap-[20px]">
              <span className="text-[35px] font-[700]">{BlogData.title}</span>
            </div>
            <div className="w-full block  aspect-video rounded-[20px] overflow-hidden relative">
              <Image
                src={BlogData.img_url}
                width={100}
                height={100}
                alt="Chicken"
                className="w-full h-full object-cover"
                //   placeholder="blur"
                loading="lazy"
              />
            </div>
            <div
              className="w-full"
              dangerouslySetInnerHTML={renderHTML(BlogData.content)}
            ></div>
            <div className="flex mt-[50px] flex-col items-start w-full gap-[30px]">
              <div className="flex justify-between items-center w-full gap-[20px]">
                <span className="text-[35px] font-[700]">Comments</span>
                <Popup
                  clickElement={
                    <div className="hover:bg-gray-100 rounded-full p-2 cursor-pointer">
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
                          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>
                  }
                  children={
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-[20px]"
                    >
                      <div className="flex flex-col justify-start w-full gap-[20px]">
                        <span className="text-[35px] font-[700]">
                          Say something
                        </span>
                      </div>
                      <div>
                        <textarea
                          className="outline-none w-full border rounded-[8px] p-[10px]"
                          rows={10}
                          {...register("comment")}
                        />
                        <span className="text-xs text-red-500">
                          {errors.comment && errors.comment.message}
                        </span>
                      </div>
                      <div className="flex justify-end items-center">
                        <Button
                          text={
                            commentLoading ? (
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
                              "Comment"
                            )
                          }
                          className="!bg-[#1d4e4b] text-white"
                        />
                      </div>
                    </form>
                  }
                  is_open={is_open}
                />
              </div>
              <div className="h-[400px] w-full overflow-y-auto">
                <div className="h-max w-full flex gap-[10px] flex-col p-[20px]">
                  {comments.reverse().map((comment, index, array) => (
                    <div className="flex gap-[10px] h-max items-center w-max">
                      <div>
                        <div className="w-[50px] aspect-square rounded-full bg-gray-100 justify-center items-center flex">
                          ?
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-[20px] w-max p-[15px]">
                        {array[array.length - 1 - index]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        ))}
    </>
  );
}
