"use client";

import { useRouter } from "next/navigation";
import { useGetScheduleData } from "../../utils/getSuapbaseData";
import { ScheduleEventType } from "./Tyeps";
import Link from "next/link";
import { format } from "path";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: ScheduleEventType[] = useGetScheduleData();
  // 月ごとにグループ化したデータの保存
  const [formatGroupData, setFormatGroupData] = useState<{ [date: string]: ScheduleEventType[] }>(
    {}
  );

  // chatGPT君
  // 月ごとにグルーピングする処理
  useEffect(() => {
    //データが不正またはデータが取得できなかった場合
    if (!diaryData || diaryData.length === 0) return;

    //月ごとのグループオブジェクト変数
    const groupData: { [date: string]: ScheduleEventType[] } = {};
    diaryData.forEach((data: ScheduleEventType) => {
      const groupDate = data.date.slice(0, 7);
      if (groupData[groupDate]) {
        groupData[groupDate].push(data); //groupDataに対象日付のkeyがあった場合その場所へ追加
      } else {
        groupData[groupDate] = [data]; // 配列を初期化し、最初の要素を同時に追加
      }
      console.log("これはグループの配列", formatGroupData);
    });
    setFormatGroupData(groupData);
  }, [diaryData]);

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

  return (
    <div>
      <button onClick={() => router.push("/Calendar")}>カレンダーアイコン</button>
      <button onClick={() => router.push("/AddSchedule")}>鉛筆</button>
      <div className="flex flex-col mt-10 min-h-screen">
        <h1 className="text-5xl mx-auto mb-5">日記一覧</h1>
        <ul>
          {/* 日付ごとにグループ化したデータのkeyを抽出 */}
          {Object.keys(formatGroupData).map((groupDate) => (
            <li>
              <p className="bg-blue-500 mx-2">{groupDate.replace("-", "年")}月</p>
              {/* 日付ごとにグループ化したデータをkeyごとに抽出 */}
              <p>
                <ul>
                  {formatGroupData[groupDate].map((diary) => (
                    <li key={diary.Id}>
                      <div className="bg-[#c1e0ff] mx-5 my-2">
                        <Link href={`DiaryDetail/${diary.Id}`}>
                          <div className="flex items-center">
                            <p className=" flex justify-center items-center w-14 h-14 rounded-full bg-red-200 m-1">
                              {formatDate(diary.date)}
                            </p>
                            <h2 className="text-3xl ml-3 ">{formatTitle(diary.title)}</h2>
                          </div>
                          <p className="mt-3">{formatContent(diary.DiaryContent)}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
