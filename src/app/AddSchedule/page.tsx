"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../../utils/supabase";
import CustomizedTooltips from "../Components/MaterialUI";
import { AddDiary } from "../Function/function";
import { Button } from "@mui/material";

const AddSchedule = () => {
  const router = useRouter();
  const [addTitle, setAddTitle] = useState<string>("");
  const [addDate, setAddDate] = useState<string>("");
  const [addContent, setAddContent] = useState<string>("");
  const [addEmotion,setAddEmotion]=useState<string>("")

  
  useEffect(() => {
    const formatDate = new Date()
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replaceAll("/", "-");
    setAddDate(formatDate); // 日付を設定
  }, []);


  return (
    <div className="flex flex-col justify-center items-center max-h-full py-2 min-h-screen text-2xl	max-w-[1200px] mx-auto">
      <input
        onChange={(e) => setAddDate(e.target.value)}
        type="date"
        value={addDate}
        className=""
      />
      <div className="flex justify-between w-1/3 ">
      <CustomizedTooltips editEmotion={addEmotion} emotion="😁" setEmotion={setAddEmotion}/>
      <CustomizedTooltips editEmotion={addEmotion} emotion="😡" setEmotion={setAddEmotion}/>
      <CustomizedTooltips editEmotion={addEmotion} emotion="😢" setEmotion={setAddEmotion}/>
      <CustomizedTooltips editEmotion={addEmotion} emotion="😊" setEmotion={setAddEmotion}/>
      </div>
      <div className="w-5/6 ">
        <button onClick={() => router.push("/")}>
          戻る
        </button>
        <div className="flex flex-col ">
          <button></button>
          <label className="flex">
            Title
            <input
              className="ml-1 w-full"
              type="text"
              onChange={(e) => setAddTitle(e.target.value)}
              placeholder="Titleを記入してください"
            />
          </label>
          <textarea
            onChange={(e) => setAddContent(e.target.value)}
            value={addContent}
            placeholder="内容を記入してください"
            rows={6}
          ></textarea>
          <button className="self-center" onClick={()=>AddDiary(addTitle,addDate,addContent,addEmotion)}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
