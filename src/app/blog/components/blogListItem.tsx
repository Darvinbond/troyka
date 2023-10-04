import Image from "next/image";
import React from "react";
import Chicken from "../../../assets/images/chicken.jpg";
import DOMPurify from "dompurify";
import Popup from "@/app/components/popup";
import CreateEditPost from "@/app/components/createEditPost";
import { useDispatch } from "react-redux";
import { deleteBlog } from "@/GlobalRedux/reducers/blogReducers";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";

type BlogListItemProps = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  content: string;
  img_url: string;
};

function BlogListItem({
  id,
  title,
  date,
  tags,
  content,
  img_url,
}: BlogListItemProps) {
  function stripHTMLTags(html: string) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="grid grid-cols-6 gap-[5px] h-[250px] border rounded-[20px] overflow-hidden">
      <div className="col-span-2 block h-full overflow-hidden relative">
        <Image
          src={img_url}
          width={100}
          height={100}
          alt="Chicken"
          className="w-full h-full object-cover"
          //   placeholder="blur"
          loading="lazy"
        />
        <div className="absolute z-50 h-max top-[10px] left-[10px] bg-white bg-opacity-50 rounded-full flex gap-2 items-center justify-start px-[10px] py-[5px] backdrop-blur-sm">
          <span className="h-[30px] aspect-square p-2 bg-transparent hover:bg-[whitesmoke] hover:text-blue-500 transition-all duration-300 cursor-pointer rounded-full flex justify-center items-center">
            <Popup
              clickElement={
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              }
            >
              <CreateEditPost
                is_create={false}
                data={{
                  id: id,
                  title: title,
                  tags: tags,
                  content: content,
                  img_url: img_url,
                }}
              />
            </Popup>
          </span>

          <span
            onClick={() => dispatch(deleteBlog(id))}
            className="h-[30px] aspect-square p-2 bg-transparent hover:bg-[whitesmoke] hover:text-red-500 transition-all duration-300 cursor-pointer rounded-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="col-span-4 flex flex-col items-start justify-between p-[20px]">
        <div className="flex items-center w-full justify-between">
          <div>
            <span className="border-[#fc6719] font-[400] px-[10px] py-[3px] border rounded-full text-[12px] text-[#fc6719] bg-[#fd905663]">
              {tags[0]}
            </span>{" "}
            {tags.length !== 1 && (
              <span className="text-[12px] text-[#fc6719]">{`+ ${
                tags.length - 1
              } more`}</span>
            )}
          </div>
          <span className="text-[12px] font-[300]">{date}</span>
        </div>
        <a
          href={`/blog/${id}`}
          className="text-[25px] font-[600] text-[#1d4e4b] hover:underline cursor-pointer"
        >
          {title}
        </a>
        <span
          className="text-[14px] font-[300] h-[100px] w-full overflow-hidden text-ellipsis"
          // dangerouslySetInnerHTML={renderHTML(content)}
        >
          {stripHTMLTags(content)}
        </span>
      </div>
    </div>
  );
}

export default BlogListItem;
