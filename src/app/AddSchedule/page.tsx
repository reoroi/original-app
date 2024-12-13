"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../utils/supabase";

const AddSchedule = () => {
  const router = useRouter();
  const [addTitle, setAddTitle] = useState("");
  const [addDate,setAddDate]=useState("")
  const [addContent,setAddContent]=useState("")

  useEffect(() => {
    const formatDate = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/","-");
    setAddDate(formatDate); // 日付を設定
  }, []);

  const AddDiary=async()=>{
    const { error:addDiaryError } = await supabase
  .from('DiaryData')
  .insert({Title:addTitle,DiaryDate:addDate,DiaryContent:addContent})
  if(addDiaryError){
    console.log(addDiaryError)
  }
  }


  const clickHome = () => {
    router.push("/");
  };

  return (
    // flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200
    <div className="flex flex-col justify-center items-center max-h-full py-2 min-h-screen text-2xl	max-w-[1200px] mx-auto">
      <input onChange={(e)=>setAddDate(e.target.value)} type="date" value={addDate}  className=""/>
      <div className="w-5/6 ">
        <button onClick={clickHome} className="block">戻る</button>
        <div className="flex flex-col ">
          <label className="flex">
            Title
          <input
          className="ml-1 w-full"
            type="text"
            onChange={(e) => setAddTitle(e.target.value)}
            placeholder="Titleを記入してください"
          />
          </label>
          <textarea onChange={(e)=>setAddContent(e.target.value)} value={addContent} placeholder="内容を記入してください"  rows={6}></textarea>
          <button className="self-center" onClick={AddDiary}>保存</button>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
