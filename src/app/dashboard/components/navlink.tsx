"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  otherProps?: any;
}

function Navlink({ href, children, ...otherProps }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={
        (isActive ? " text-[#fc6719] font-[600]" : "") +
        " transition-all duration-300 cursor-pointer rounded-[10px] hover:underline hovedr:bg-green-50"
      }
      href={href}
      {...otherProps}
    >
      <span>{children}</span>
    </Link>
  );
}

export default Navlink;
