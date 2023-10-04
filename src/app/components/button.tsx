import React, { ReactNode } from "react";

type ButtonProps = {
  text: string | ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: (e?: any) => void;
};

export default function Button({
  text,
  icon,
  badge,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "w-max transition-all duration-200 border border-transparent cursor-pointer h-max px-[16px] py-[10px] flex items-center gap-[10px] text-[#021112] font-[600] text-[16px] bg-white rounded-full " +
        className
      }
    >
      {badge && (
        // <span className="text-[10px] w-[30px] p-[5px] rounded-full bg-[#e4b38b] text-white aspect-square flex justify-center items-center">
        <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-[9px] font-[700] text-green-800 bg-green-200 rounded-full">
          {badge}
        </span>
      )}
      {icon}
      {text}
    </button>
  );
}
