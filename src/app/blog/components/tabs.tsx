import Button from "@/app/components/button";
import React from "react";

type Props = {};

const tabsContent = [
  { title: "All", count: 150 },
  { title: "Vegetables", count: 12 },
  { title: "Meat", count: 33 },
  { title: "Baking", count: 5 },
  { title: "Local", count: 86 },
  { title: "Beverage", count: 90 },
  { title: "Freestyle", count: 3 },
  { title: "Others", count: 0 },
];

export default function Tabs({}: Props) {
  return (
    <div className="flex items-center bg-[#1d4e4b] w-max h-max p-[5px] border rounded-full gap-0 justify-start">
      {tabsContent.map((content, index) => (
        <Button
          key={index}
          badge={`${content.count}`}
          className="!bg-transparent hover:!bg-[#2b6b67] !gap-1 !text-white !font-[300]"
          text={content.title}
        />
      ))}
    </div>
  );
}
