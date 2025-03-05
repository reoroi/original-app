"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CalendarEventType } from "../Tyeps";
import { useGetScheduleData } from "../../../utils/getSuapbaseData";
import { formatContent, formatDate, formatTitle } from "../Function/function";
import Image from "next/image";
import { ImageResponse } from "next/server";

//検索がかかった場合検索ワードがpropsとして渡される
export const DiaryList = ({ searchList }: { searchList?: CalendarEventType[] }) => {
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: CalendarEventType[] = useGetScheduleData();
  // 月ごとにグループ化したデータの保存
  const [formatGroupData, setFormatGroupData] = useState<{ [date: string]: CalendarEventType[] }>(
    {}
  );
  //ChatGPT君
  useEffect(() => {
    //月ごとのグループオブジェクト変数を宣言
    const diaryGroupData: { [date: string]: CalendarEventType[] } = {};

    //検索のpropsが場合
    if (searchList && searchList.length > 0) {
      searchList.forEach((data: CalendarEventType) => {
        const groupDate = data.date.slice(0, 7);
        if (diaryGroupData[groupDate]) {
          diaryGroupData[groupDate].push(data); //groupDataに対象日付のkeyがあった場合その場所へ追加
        } else {
          diaryGroupData[groupDate] = [data]; // 配列を初期化し、最初の要素を同時に追加
        }
      });
    } else {
      //検索がかかっていなければすべて表示
      diaryData.forEach((data: CalendarEventType) => {
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
    console.log(formatGroupData);
  }, [diaryData, searchList]);

  return (
    <div>
      {/* 日付ごとにグループ化したデータのkeyを抽出 */}
      <ul>
        {Object.keys(formatGroupData).map((groupDate) => (
          <li key={groupDate}>
            <p className="bg-blue-500 mx-2 pl-5 py-1 text-white text-2xl font-bold rounded shadow-xl ">
              {groupDate.replace("-", "年")}月
            </p>
            {/* 日付ごとにグループ化したデータをkeyごとに抽出 */}
            <ul>
              {formatGroupData[groupDate].map((diary) => {
                // 日記画像データを取得
                const imageObject: { [key: string]: string }[] = diary.DiaryImage || [];
                // 日記画像のURL変数
                let imageURL = "";
                // 日記画像データがあれば
                if (imageObject.length > 0) {
                  // 1つ目のオブジェクトのvalueから画像URLを取得
                  imageURL = Object.values(imageObject[0])[0];
                }
                return (
                  <li key={diary.Id}>
                    <div className=" bg-[#DBEAFF] mx-7 my-5 rounded-xl hover:bg-sky-200 px-5 py-2 shadow-md shadow-blue-300">
                      <Link href={`DiaryDetail/${diary.Id}`}>
                        <div className="flex items-center  max-h-[150px] ">
                          <p className=" flex justify-center items-center w-14 h-14 rounded-full bg-blue-400 m-2 text-white font-bold ">
                            {formatDate(diary.date)}
                          </p>
                          <h2 className="text-3xl ml-3 ">{formatTitle(diary.title)}</h2>
                          {/* 日記画像の1つ目を表示 */}
                          <p className="text-4xl  ml-6">{diary.DiaryEmotion}</p>
                          {imageURL && (
                            <div className="ml-auto max-h-[150px] flex justify-end items-center mr-5">
                              <Image
                                className="w-auto max-h-[150px] object-contain rounded-lg"
                                src={imageURL || ""}
                                alt="DiaryImage"
                                width={500}
                                height={500}
                                />
                            </div>
                          )}
                        </div>
                        <p className="mt-3">{formatContent(diary.DiaryContent)}</p>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;
