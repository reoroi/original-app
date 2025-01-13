"use client"
import {  useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/Calendar")}>カレンダーアイコン</button>
      <button onClick={() => router.push("/AddSchedule")}>鉛筆</button>
      <button onClick={() => router.push("/DiarySearch")}>虫眼鏡アイコン</button>
    </>
  );
};

export default Header;
