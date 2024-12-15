"use client";

import { useRouter } from "next/navigation";
import { useGetScheduleData } from "../../utils/getSuapbaseData";
import { ScheduleEventType } from "./Tyeps";
import Link from "next/link";
import { format } from "path";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: ScheduleEventType[] = useGetScheduleData();
  const [groupByDate,setGroupDate]=useState([])

  //日付を月と日に分ける
  const formatDate = (date: string | undefined) => {
    if (date) {
      //月と日だけを取り出す
      const monthDay = date.slice(5);
      const formatDate = monthDay.replace("-", "/");
      return formatDate;
    }
  };

  // Titleを30字以内で表示
  const formatTitle = (title: string) => {
    if (title.length > 30) {
      const formatTitle = title.slice(0, 29);
      return formatTitle;
    } else {
      return title;
    }
  };

  // Contentを60字以内で表示
  const formatContent = (Content: string) => {
    if (Content.length > 60) {
      const formatContent = Content.slice(0, 59);
      return formatContent;
    } else {
      return Content;
    }
  };

  // 月ごとにグルーピングする処理
  const groupByMonth = (diaryDate:string) => {
    
      return diaryDate

  };

  return (
    <div>
      <button onClick={() => router.push("/Calendar")}>カレンダーアイコン</button>
      <button onClick={() => router.push("/AddSchedule")}>鉛筆</button>
      <div className="flex flex-col mt-10 min-h-screen">
        <h1 className="text-5xl mx-auto mb-5">日記一覧</h1>
        <ul className="">
          {diaryData.map((data) => (
            <li key={data.Id}>
              <p>{groupByMonth(data.date)}</p>
              <div className="bg-[#c1e0ff] mx-5 my-2">
                <Link href={`DiaryDetail/${data.Id}`}>
                  <div className="flex items-center">
                    <p className=" flex justify-center items-center w-14 h-14 rounded-full bg-red-200 m-1">
                      {formatDate(data.date)}
                    </p>
                    <h2 className="text-3xl ml-3 ">{formatTitle(data.title)}</h2>
                  </div>
                  <p className="mt-3">{formatContent(data.DiaryContent)}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
