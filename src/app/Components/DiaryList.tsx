"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ScheduleEventType } from "../Tyeps";
import { useGetScheduleData } from "../../../utils/getSuapbaseData";
import { formatContent, formatDate, formatTitle } from "../Function/function";

//検索がかかった場合検索ワードがpropsとして渡される
export const DiaryList = ({ searchList }: { searchList?: ScheduleEventType[] }) => {
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: ScheduleEventType[] = useGetScheduleData();
  // 月ごとにグループ化したデータの保存
  const [formatGroupData, setFormatGroupData] = useState<{ [date: string]: ScheduleEventType[] }>(
    {}
  );
  //ChatGPT君
  useEffect(() => {
    //月ごとのグループオブジェクト変数を宣言
    const diaryGroupData: { [date: string]: ScheduleEventType[] } = {};

    //検索のpropsが場合
    if (searchList && searchList.length > 0) {
      searchList.forEach((data: ScheduleEventType) => {
        // 
        const groupDate = data.date.slice(0, 7);
        console.log(groupDate,"dkdklfjaldk")
        if (diaryGroupData[groupDate]) {
          diaryGroupData[groupDate].push(data); //groupDataに対象日付のkeyがあった場合その場所へ追加
        } else {
          diaryGroupData[groupDate] = [data]; // 配列を初期化し、最初の要素を同時に追加
        }
      });
    } else {
      //検索がかかっていなければすべて表示
      diaryData.forEach((data: ScheduleEventType) => {
        const groupDate = data.date.slice(0, 7);
        if (diaryGroupData[groupDate]) {
          diaryGroupData[groupDate].push(data); //groupDataに対象日付のkeyがあった場合その場所へ追加
        } else {
          diaryGroupData[groupDate] = [data]; // 配列を初期化し、最初の要素を同時に追加
        }
      });
    }

    // 日付ごとのソート
    setFormatGroupData(diaryGroupData);
  }, [diaryData, searchList]);



  return (
    <div>
      {/* 日付ごとにグループ化したデータのkeyを抽出 */}
      <ul>
        {Object.keys(formatGroupData).map((groupDate) => (
          <li key={groupDate}>
            <p className="bg-blue-500 mx-2 pl-5 py-1 text-white text-2xl font-bold rounded">
              {groupDate.replace("-", "年")}月
            </p>
            {/* 日付ごとにグループ化したデータをkeyごとに抽出 */}
            <ul>
              {formatGroupData[groupDate].map((diary) => (
                <li key={diary.Id}>
                  <div className=" bg-[#DBEAFF] mx-5 my-2 rounded-md hover:bg-sky-200">
                    <Link href={`DiaryDetail/${diary.Id}`}>
                      <div className="flex items-center text-blue-00">
                        <p className=" flex justify-center items-center w-14 h-14 rounded-full bg-blue-400 m-2 text-white font-bold ">
                          {formatDate(diary.date)}
                        </p>
                        <h2 className="text-3xl ml-3 ">{formatTitle(diary.title)}</h2>
                        <p className="text-4xl ml-auto mr-5">{diary.DiaryEmotion}</p>
                      </div>
                      <p className="mt-3">{formatContent(diary.DiaryContent)}</p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;
