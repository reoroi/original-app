"use client"
import { useEffect } from "react";

export const getToday=(setDate:React.Dispatch<React.SetStateAction<string>>)=>{

  useEffect(() => {
    const formatDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
    setDate(formatDate); // 日付を設定
  }, []);
  
}