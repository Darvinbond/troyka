"use client";

import Image from "next/image";
import Cook3 from "../assets/images/cook3.jpg";
import Cook2 from "../assets/images/cook2.jpg";
import Button from "./components/button";
import { useRouter } from "next/navigation";
import "./globals.css";
import Navbar from "./components/navbar";

// THEne:: brown: #e4b38b black: #021112
export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Navbar />
      <div className="grid gap-0 h-full grid-cols-3">
        <div className=" flex justify-center items-center">
          <Image src={Cook3} alt="Picture of the author" placeholder="blur" />
          <div className="absolute text-gray-50 flex flex-col w-max h-[250px] items-center justify-between text-center">
            <span className="font-[700] max-w-[300px] text-[40px]">
              Get your First Chef Job
            </span>
            <span className="font-[300] w-full max-w-[250px] text-[16px]">
              Your very first step in this career path is to get a job.
            </span>
            <Button
              onClick={() => router.push("/dashboard")}
              text="Start writing"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-[16px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              }
              className="hover:bg-gray-100 hover:border-[#021112]"
            />
          </div>
        </div>
        <div className="flex relative overflow-hidden h-full justify-center items-center">
          <video
            loop={true}
            autoPlay={true}
            className="absolute top-0 left-0 object-cover right-0 w-full h-full"
            muted={true}
            controls={false}
          >
            <source src="/assets/video/cook2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className=" flex justify-center items-center">
          <Image src={Cook2} alt="Picture of the author" placeholder="blur" />
          <div className="absolute text-gray-50 flex flex-col w-max h-[250px] items-center justify-between text-center">
            <span className="font-[700] max-w-[300px] text-[40px]">
              Sprinkle, food&apos;s best friend.
            </span>
            <span className="font-[300] w-full max-w-[250px] text-[16px]">
              Why bother when you can easily mix up a batch at home.
            </span>
            <Button
              onClick={() => router.push("/blog")}
              text="Read Reciepe"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-[16px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              }
              className="hover:bg-gray-100 hover:border-[#021112]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
