"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddSchedule = () => {
  const router = useRouter();
  const [addTitle,setAddTitle]=useState('')

  const clickHome = () => {
    router.push("/");
  };
  return (
    // flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200
    <div className="flex flex-col justify-center items-center max-h-full py-2 h-screen  ">
      <div className="bg-red-900 m-3">
        <button onClick={clickHome}>戻る</button>
      <div className="flex justify-center flex-col">
        <p>Title</p>
        <input type="text" onChange={(e)=>setAddTitle(e.target.value)} placeholder="Titleを記入してください" />
        <p>内容</p>
        <textarea placeholder="内容を記入してください"></textarea>
        <button>保存</button>
      </div>
      </div>
    </div>
  );
};

export default AddSchedule;
