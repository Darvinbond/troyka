"use client";

import React from "react";
import Button from "../components/button";
import Navlink from "./components/navlink";
import { Outlet } from "react-router-dom";
import PostList from "./postList";

type Props = {};

export default function page({}: Props) {
  return <PostList />;
}
